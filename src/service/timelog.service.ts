import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { camelCase, concat, groupBy, orderBy, round } from 'lodash';
import * as moment from 'moment';
import { UserEntity } from 'src/entity/user.entity';
import { FindManyOptions, In, Repository } from 'typeorm';
import * as XLSX from 'xlsx';

import { QUERY_DATE_FORMAT, TIME_FORMAT_2 } from '../constant/constants';
import { DayType } from '../constant/day-type';
import { LeaveStatus, LeaveType } from '../constant/leave';
import { CalendarDayEntity } from '../entity/calendar-day.entity';
import { EmployeeEntity } from '../entity/employee/employee.entity';
import { LeaveLogsEntity } from '../entity/employee/leave-log.entity';
import { TimelogEntity } from '../entity/employee/timelog.entity';
import { CalendarService } from './calendar.service';
import { CompanyService } from './company.service';
import { CoreService } from './core.service';
import { EmployeeService } from './employee.service';
import { LeaveService } from './leave.service';
import { SiteService } from './site.service';

export interface LeaveDetails {
  withPay: boolean;
  reason: string;
  type: LeaveType;
  hours: number;
  status: LeaveStatus;
}
export interface TimelogInfo {
  clockIn: string;
  breakIn: string;
  breakOut: string;
  clockOut: string;
  isRestDay: boolean;
  isOnLeave: boolean | LeaveDetails;
  multiplier: DayType;
}

export interface ExtendedTimelogInfo extends TimelogInfo {
  isAbsent: boolean;
  totalBreakHrs: number;
  regularHrs: number;
  lateHrs: number;
  undertimeHrs: number;
  overtimeHrs: number;
  nightDiffHrs: number;
  nightDiffOtHrs: number;
}

export interface TimelogCollection {
  [key: string]: ExtendedTimelogInfo;
}
@Injectable()
export class TimelogService extends CoreService<TimelogEntity> {
  constructor(
    @InjectRepository(TimelogEntity)
    readonly timelogRepository: Repository<TimelogEntity>,

    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private calendarService: CalendarService,
    private companyService: CompanyService,
    private siteService: SiteService
  ) {
    super(timelogRepository);
  }

  async saveLog(timelog: Partial<TimelogEntity>) {
    const entity = this.repository.create(timelog);
    return this.repository.save(entity);
  }

  async getTimelogsByEmployee(id: string, dateFrom: string, dateTo: string) {
    const employee = await this.employeeService.get(id);
    employee.company = await this.companyService.get(employee.companyId);
    return this.consolidateTimelogs(employee, dateFrom, dateTo);
  }

  async consolidateTimelogs(
    employee: EmployeeEntity,
    dateFrom: string,
    dateTo: string
  ): Promise<TimelogCollection> {
    try {
      const isoDateFrom = moment(dateFrom, QUERY_DATE_FORMAT).format('L');
      const isoDateTo = moment(dateTo, QUERY_DATE_FORMAT).format('L');

      // create date range
      const dates = this.createDatesFromRange(isoDateFrom, isoDateTo);

      // get timelogs
      const timelogs = await this.getTimelogs(employee, dates);

      // get leaves
      const leaves = await this.getLeaves(employee.id, dates);

      // get holidays
      const calendarDays = await this.getCalendarDates(dates);

      return this.groupTimeLogs(
        employee,
        dates,
        leaves,
        timelogs,
        calendarDays
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private extendTimelog(
    employee: EmployeeEntity,
    log: TimelogInfo
  ): ExtendedTimelogInfo {
    const { company, jobDetails } = employee;
    const { shift } = jobDetails;
    const {
      workHrsStart,
      workHrsEnd,
      workHrsPerDay,
      // breakHrsStart,
      // breakHrsEnd,
    } = shift;
    const { nightShiftWorkHoursStart } = company.workPolicy;

    const mWorkHourStart = moment(workHrsStart, TIME_FORMAT_2);
    const mWorkHourEnd = moment(workHrsEnd, TIME_FORMAT_2);
    const mNightDiffStart = moment(nightShiftWorkHoursStart, TIME_FORMAT_2);

    const { clockIn, clockOut, breakIn, breakOut } = log;
    const isAbsent = !clockIn;
    const mClockIn = moment(clockIn, 'LT');
    const mClockOut = moment(clockOut, 'LT');
    const mBreakIn = moment(breakIn, 'LT');
    const mBreakOut = moment(breakOut, 'LT');

    // if clockout is on the next day for nightshift, add 24 hours
    if (mClockOut.isBefore(mClockIn)) {
      mClockOut.add(24, 'hours');
      mWorkHourEnd.add(24, 'hours');
    }

    const workingHrsVal = mClockOut.diff(mClockIn, 'hours', true) || 0;
    let totalWorkingHrs = round(workingHrsVal, 2);
    let totalBreakHrs = !isAbsent ? 1 : 0;

    if (breakIn && breakOut) {
      const breakHoursVal = mBreakOut.diff(mBreakIn, 'hours', true) || 0;
      totalBreakHrs = round(breakHoursVal, 2);
    }

    if (!isAbsent) {
      const hoursToDeduct = totalBreakHrs < 1 ? 1 : totalBreakHrs;
      totalWorkingHrs = totalWorkingHrs - hoursToDeduct;
    }

    const isLate = mClockIn.isAfter(mWorkHourStart);
    const isUndertime = totalWorkingHrs < workHrsPerDay;
    const isOvertime = !isUndertime && totalWorkingHrs > workHrsPerDay;

    const lateHrsVal = mClockIn.diff(mWorkHourStart, 'hours', true);
    const lateHrs = isLate ? round(lateHrsVal, 2) : 0;
    const undertimeHrsVal = !isAbsent ? workHrsPerDay - totalWorkingHrs : 0;
    const undertimeHrs = isUndertime ? round(undertimeHrsVal, 2) : 0;

    let overtimeHrs = 0;
    let nightDiffHrs = 0;
    let nightDiffOtHrs = 0;

    if (isOvertime) {
      const mExpectedOut = mClockIn.add(workHrsPerDay, 'hours');

      if (mClockOut.isBefore(mNightDiffStart)) {
        const otHrsVal = mClockOut.diff(mExpectedOut, 'hours', true);
        overtimeHrs = round(otHrsVal, 2);
      }

      if (mClockOut.isAfter(mNightDiffStart)) {
        const otHrsVal = mClockOut.diff(mExpectedOut, 'hours', true);
        overtimeHrs = round(otHrsVal, 2);
        const ndOtHrsVal = mClockOut.diff(mNightDiffStart, 'hours', true);
        nightDiffOtHrs = round(ndOtHrsVal, 2);
      }
    } else {
      if (mClockOut.isAfter(mNightDiffStart)) {
        const ndHrsVal = mClockOut.diff(mNightDiffStart, 'hours', true);
        nightDiffHrs = round(ndHrsVal, 2);
      }
    }

    const regularHrs = totalWorkingHrs - overtimeHrs;

    return {
      ...log,
      isAbsent,
      totalBreakHrs: round(totalBreakHrs, 2),
      regularHrs: round(regularHrs, 2),
      lateHrs: round(lateHrs, 2),
      undertimeHrs: round(undertimeHrs, 2),
      overtimeHrs: round(overtimeHrs, 2),
      nightDiffHrs: round(nightDiffHrs, 2),
      nightDiffOtHrs: round(nightDiffOtHrs, 2),
    };
  }

  private getCalendarDates(dates: string[]) {
    return this.calendarService.getDates(dates);
  }

  private getLeaves(employeeId: string, dates: string[]) {
    return this.leaveService.repository.find({
      where: {
        employeeId,
        isDeleted: 0,
        start: In(dates),
      },
    });
  }

  private async getTimelogs(employee: EmployeeEntity, dates: string[]) {
    const list = await this.repository.find({
      where: {
        employee,
        isDeleted: 0,
        date: In(dates),
      },
      order: {
        createTime: 'ASC',
      },
      relations: ['employee'],
    } as FindManyOptions<TimelogEntity>);

    const timelogs = list.sort(
      (a, b) => moment(a.time, 'LT').unix() - moment(b.time, 'LT').unix()
    );

    return timelogs;
  }

  private groupTimeLogs(
    employee: EmployeeEntity,
    dates: string[],
    leaves: LeaveLogsEntity[],
    timelogs: TimelogEntity[],
    calendarDays: CalendarDayEntity[]
  ): TimelogCollection {
    // group logs per day
    const logsPerDay = groupBy(timelogs, log => log.date);

    // rest days
    const restDays = employee.jobDetails.restDays.split(',').reduce(
      (days, name) => ({
        ...days,
        [name]: true,
      }),
      {}
    );

    const ratedDays = this.getRatedDays(calendarDays);
    const grouped = dates.reduce((consolidated, date) => {
      const { clockIn, breakIn, breakOut, clockOut } = this.getActionLogs(
        logsPerDay[date]
      );

      const isRestDay = this.isRestDay(date, restDays);
      const isOnLeave = this.isOnLeave(date, leaves);

      const multiplier = this.getMultiplier(ratedDays, date, isRestDay);

      const basicTimelog: TimelogInfo = {
        clockIn,
        breakIn,
        breakOut,
        clockOut,
        isRestDay,
        isOnLeave,
        multiplier,
      };

      return {
        ...consolidated,
        [date]: this.extendTimelog(employee, basicTimelog),
      };
    }, {});
    return grouped;
  }

  private getRatedDays(
    calendarDays: CalendarDayEntity[]
  ): { [key: string]: DayType } {
    return calendarDays.reduce((days, { date, type }) => {
      return {
        ...days,
        [moment(date, 'L').format(QUERY_DATE_FORMAT)]: type,
      };
    }, {});
  }

  private getMultiplier(
    ratedDays: { [key: string]: DayType },
    formattedDate: string,
    isRestDay: boolean
  ): DayType {
    const type = ratedDays[formattedDate];

    switch (type) {
      case DayType.specialNonWorkingDay:
        return isRestDay
          ? DayType.specialNonWorkingRestDay
          : DayType.specialNonWorkingDay;
      case DayType.regularHoliday:
        return isRestDay
          ? DayType.regularHoliday
          : DayType.regularHolidayRestDay;
      default:
        return isRestDay ? DayType.restDay : DayType.regularWorkingDay;
    }
  }

  private getActionLogs(timelogs: TimelogEntity[]) {
    const defaultReturn = {
      clockIn: undefined,
      clockOut: undefined,
      breakIn: undefined,
      breakOut: undefined,
    };

    if (!timelogs) {
      return defaultReturn;
    }

    // get first clockin
    let clockInList = timelogs.filter(v => 'clockIn' === camelCase(v.type));
    clockInList = orderBy(clockInList, ['createTime'], ['desc']);

    // get last clockout
    let clockOutList = timelogs.filter(v => 'clockOut' === camelCase(v.type));
    clockOutList = orderBy(clockOutList, ['createTime'], ['asc']);

    timelogs = concat(clockInList, clockOutList);

    return timelogs.reduce(
      (col, doc) => ({
        ...col,
        [camelCase(doc.type)]: doc.time,
      }),
      defaultReturn
    );
  }

  private isRestDay(date: string, restDays: { [key: string]: boolean }) {
    const dayName = moment(date, 'L').format('dddd');
    return restDays[dayName] === true;
  }

  private isOnLeave(
    date: string,
    leaves: LeaveLogsEntity[]
  ): boolean | LeaveDetails {
    const leaveRecord = leaves.find(({ start }) =>
      moment(start, 'L').isSame(moment(date, QUERY_DATE_FORMAT), 'd')
    );

    if (leaveRecord) {
      const { hours, status, withPay, reason, type } = leaveRecord;

      return {
        withPay,
        reason,
        type,
        hours,
        status,
      };
    }

    return false;
  }

  private createDatesFromRange(dateFrom: string, dateTo: string) {
    const from = moment(dateFrom, QUERY_DATE_FORMAT);
    const to = moment(dateTo, QUERY_DATE_FORMAT);
    const diff = to.diff(from, 'd');

    let dates = [from.format('L')];
    for (let v = 1; v <= diff; v++) {
      dates = [...dates, from.add(1, 'd').format('L')];
    }

    return dates;
  }

  async generateTemplate(params) {
    const { dateFrom, dateTo, siteId } = params;

    // TODO: fetch employee by site once relationship is done
    // const siteEmployees = await this.employeeSiteService.getEmployeesBySite()

    // site info
    const site = await this.siteService.get(siteId);
    const { name } = site;

    // create date range
    const dates = this.createDateRange(dateFrom, dateTo).map(date =>
      moment(date, QUERY_DATE_FORMAT).format('MMM DD, YYYY')
    );

    const dateRange = [];
    dates.forEach(date => {
      dateRange.push(date);
      dateRange.push('');
    });

    /* make worksheet */

    /* create headers */
    const headers = [
      ['Employee Attendance'],
      [
        `${moment(dateFrom, QUERY_DATE_FORMAT).format(
          'MMM DD, YYYY'
        )} - ${moment(dateTo, QUERY_DATE_FORMAT).format('MMM DD, YYYY')}`,
      ],
      [],
      ['Site Id', siteId],
      ['Site Name', name],
      [],
      ['Employee Id', 'Name'],
    ];
    headers[headers.length - 1] = concat(
      headers[headers.length - 1],
      dateRange
    );
    const timelogRemarks = [];
    timelogRemarks.unshift(['---'], ['---']);
    dates.forEach(() => {
      timelogRemarks.push(['IN'], ['OUT']);
    });
    headers.push(timelogRemarks);

    const ws = XLSX.utils.aoa_to_sheet(headers, { cellStyles: true });

    /* merge date cells to cate IN and OUT cells */
    const merges = [];
    let dateStartCellIdx = 2;

    headers[headers.length - 2].forEach(() => {
      merges.push({
        s: { r: headers.length - 2, c: dateStartCellIdx },
        e: { r: headers.length - 2, c: ++dateStartCellIdx },
      });
      dateStartCellIdx++;
    });

    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'] = merges;

    /* add employee data to sheet */
    const employeeList = await this.employeeService.getList();
    const data = [];
    orderBy(employeeList, ['lastName'], ['asc']).forEach(employee => {
      const { employeeId, lastName, firstName } = employee;
      data.push({ employeeId, employeeName: `${lastName}, ${firstName}` });
    });

    XLSX.utils.sheet_add_json(ws, data, {
      header: ['employeeId', 'employeeName'],
      skipHeader: true,
      origin: headers.length,
    });

    const workbook = XLSX.utils.book_new();

    /* Add the worksheet to the workbook */
    XLSX.utils.book_append_sheet(workbook, ws, 'sheet');

    return XLSX.write(workbook, { type: 'buffer' });
  }

  async importFromFile(file: any, user: UserEntity) {
    // const data = new Uint8Array(file.buffer);

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    /* Get first worksheet */
    const wsname = workbook.SheetNames[0];
    const sheet = workbook.Sheets[wsname];

    /* Convert array of arrays */
    const sheetRows: any[][] = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      blankrows: false,
      raw: false,
    });

    const date: string[] = sheetRows[1][0].split(' - ');
    const dates = this.createDateRange(
      moment(Date.parse(date[0])).format(QUERY_DATE_FORMAT),
      moment(Date.parse(date[1])).format(QUERY_DATE_FORMAT)
    );

    const getSite = row => row.find(r => r.toLowerCase() === 'site id');
    const site = sheetRows.find(row => getSite(row));
    const siteId = site[site.length - 1];

    let timelogEntities = await Promise.all(
      sheetRows.splice(6).map(async row => {
        const entities = await this.generateTimelogEntities({
          site: siteId,
          dates,
          row,
          userId: user.id,
        });
        return entities;
      })
    );
    timelogEntities = timelogEntities.reduce(
      (col, doc) => [...col, ...doc],
      []
    );
    return this.repository.save(this.repository.create(timelogEntities));
  }

  private createDateRange(dateFrom, dateTo) {
    const isoDateFrom = moment(dateFrom, QUERY_DATE_FORMAT).format('L');
    const isoDateTo = moment(dateTo, QUERY_DATE_FORMAT).format('L');
    return this.createDatesFromRange(isoDateFrom, isoDateTo);
  }

  private async generateTimelogEntities(params) {
    const { site, dates, row, userId } = params;
    const employee = await this.employeeService.checkIfEmployeeIdExists(row[0]);
    let dateRangeIndx = 0;
    const entities = row.splice(2).map((value, index: number) => {
      const date = dates[dateRangeIndx];
      let type = 'clock-in';
      if (0 !== index % 2) {
        type = 'clock-out';
        dateRangeIndx++;
      }
      let time = null,
        remarks = null;
      const momentValue = moment(value, 'h:mm a');
      if (momentValue.isValid()) {
        time = momentValue.format('h:mm a');
      } else {
        remarks = value;
      }
      return {
        employee,
        site,
        type,
        time,
        date,
        remarks,
        createBy: userId,
      };
    });
    return entities;
  }
}
