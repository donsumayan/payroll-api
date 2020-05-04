"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const moment = require("moment");
const user_entity_1 = require("../entity/user.entity");
const typeorm_2 = require("typeorm");
const XLSX = require("xlsx");
const constants_1 = require("../constant/constants");
const day_type_1 = require("../constant/day-type");
const timelog_entity_1 = require("../entity/employee/timelog.entity");
const calendar_service_1 = require("./calendar.service");
const company_service_1 = require("./company.service");
const core_service_1 = require("./core.service");
const employee_service_1 = require("./employee.service");
const leave_service_1 = require("./leave.service");
const site_service_1 = require("./site.service");
let TimelogService = class TimelogService extends core_service_1.CoreService {
    constructor(timelogRepository, leaveService, employeeService, calendarService, companyService, siteService) {
        super(timelogRepository);
        this.timelogRepository = timelogRepository;
        this.leaveService = leaveService;
        this.employeeService = employeeService;
        this.calendarService = calendarService;
        this.companyService = companyService;
        this.siteService = siteService;
    }
    async saveLog(timelog) {
        const entity = this.repository.create(timelog);
        return this.repository.save(entity);
    }
    async getTimelogsByEmployee(id, dateFrom, dateTo) {
        const employee = await this.employeeService.get(id);
        employee.company = await this.companyService.get(employee.companyId);
        return this.consolidateTimelogs(employee, dateFrom, dateTo);
    }
    async consolidateTimelogs(employee, dateFrom, dateTo) {
        try {
            const isoDateFrom = moment(dateFrom, constants_1.QUERY_DATE_FORMAT).format('L');
            const isoDateTo = moment(dateTo, constants_1.QUERY_DATE_FORMAT).format('L');
            const dates = this.createDatesFromRange(isoDateFrom, isoDateTo);
            const timelogs = await this.getTimelogs(employee, dates);
            const leaves = await this.getLeaves(employee.id, dates);
            const calendarDays = await this.getCalendarDates(dates);
            return this.groupTimeLogs(employee, dates, leaves, timelogs, calendarDays);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    extendTimelog(employee, log) {
        const { company, jobDetails } = employee;
        const { shift } = jobDetails;
        const { workHrsStart, workHrsEnd, workHrsPerDay, } = shift;
        const { nightShiftWorkHoursStart } = company.workPolicy;
        const mWorkHourStart = moment(workHrsStart, constants_1.TIME_FORMAT_2);
        const mWorkHourEnd = moment(workHrsEnd, constants_1.TIME_FORMAT_2);
        const mNightDiffStart = moment(nightShiftWorkHoursStart, constants_1.TIME_FORMAT_2);
        const { clockIn, clockOut, breakIn, breakOut } = log;
        const isAbsent = !clockIn;
        const mClockIn = moment(clockIn, 'LT');
        const mClockOut = moment(clockOut, 'LT');
        const mBreakIn = moment(breakIn, 'LT');
        const mBreakOut = moment(breakOut, 'LT');
        if (mClockOut.isBefore(mClockIn)) {
            mClockOut.add(24, 'hours');
            mWorkHourEnd.add(24, 'hours');
        }
        const workingHrsVal = mClockOut.diff(mClockIn, 'hours', true) || 0;
        let totalWorkingHrs = lodash_1.round(workingHrsVal, 2);
        let totalBreakHrs = !isAbsent ? 1 : 0;
        if (breakIn && breakOut) {
            const breakHoursVal = mBreakOut.diff(mBreakIn, 'hours', true) || 0;
            totalBreakHrs = lodash_1.round(breakHoursVal, 2);
        }
        if (!isAbsent) {
            const hoursToDeduct = totalBreakHrs < 1 ? 1 : totalBreakHrs;
            totalWorkingHrs = totalWorkingHrs - hoursToDeduct;
        }
        const isLate = mClockIn.isAfter(mWorkHourStart);
        const isUndertime = totalWorkingHrs < workHrsPerDay;
        const isOvertime = !isUndertime && totalWorkingHrs > workHrsPerDay;
        const lateHrsVal = mClockIn.diff(mWorkHourStart, 'hours', true);
        const lateHrs = isLate ? lodash_1.round(lateHrsVal, 2) : 0;
        const undertimeHrsVal = !isAbsent ? workHrsPerDay - totalWorkingHrs : 0;
        const undertimeHrs = isUndertime ? lodash_1.round(undertimeHrsVal, 2) : 0;
        let overtimeHrs = 0;
        let nightDiffHrs = 0;
        let nightDiffOtHrs = 0;
        if (isOvertime) {
            const mExpectedOut = mClockIn.add(workHrsPerDay, 'hours');
            if (mClockOut.isBefore(mNightDiffStart)) {
                const otHrsVal = mClockOut.diff(mExpectedOut, 'hours', true);
                overtimeHrs = lodash_1.round(otHrsVal, 2);
            }
            if (mClockOut.isAfter(mNightDiffStart)) {
                const otHrsVal = mClockOut.diff(mExpectedOut, 'hours', true);
                overtimeHrs = lodash_1.round(otHrsVal, 2);
                const ndOtHrsVal = mClockOut.diff(mNightDiffStart, 'hours', true);
                nightDiffOtHrs = lodash_1.round(ndOtHrsVal, 2);
            }
        }
        else {
            if (mClockOut.isAfter(mNightDiffStart)) {
                const ndHrsVal = mClockOut.diff(mNightDiffStart, 'hours', true);
                nightDiffHrs = lodash_1.round(ndHrsVal, 2);
            }
        }
        const regularHrs = totalWorkingHrs - overtimeHrs;
        return Object.assign(Object.assign({}, log), { isAbsent, totalBreakHrs: lodash_1.round(totalBreakHrs, 2), regularHrs: lodash_1.round(regularHrs, 2), lateHrs: lodash_1.round(lateHrs, 2), undertimeHrs: lodash_1.round(undertimeHrs, 2), overtimeHrs: lodash_1.round(overtimeHrs, 2), nightDiffHrs: lodash_1.round(nightDiffHrs, 2), nightDiffOtHrs: lodash_1.round(nightDiffOtHrs, 2) });
    }
    getCalendarDates(dates) {
        return this.calendarService.getDates(dates);
    }
    getLeaves(employeeId, dates) {
        return this.leaveService.repository.find({
            where: {
                employeeId,
                isDeleted: 0,
                start: typeorm_2.In(dates),
            },
        });
    }
    async getTimelogs(employee, dates) {
        const list = await this.repository.find({
            where: {
                employee,
                isDeleted: 0,
                date: typeorm_2.In(dates),
            },
            order: {
                createTime: 'ASC',
            },
            relations: ['employee'],
        });
        const timelogs = list.sort((a, b) => moment(a.time, 'LT').unix() - moment(b.time, 'LT').unix());
        return timelogs;
    }
    groupTimeLogs(employee, dates, leaves, timelogs, calendarDays) {
        const logsPerDay = lodash_1.groupBy(timelogs, log => log.date);
        const restDays = employee.jobDetails.restDays.split(',').reduce((days, name) => (Object.assign(Object.assign({}, days), { [name]: true })), {});
        const ratedDays = this.getRatedDays(calendarDays);
        const grouped = dates.reduce((consolidated, date) => {
            const { clockIn, breakIn, breakOut, clockOut } = this.getActionLogs(logsPerDay[date]);
            const isRestDay = this.isRestDay(date, restDays);
            const isOnLeave = this.isOnLeave(date, leaves);
            const multiplier = this.getMultiplier(ratedDays, date, isRestDay);
            const basicTimelog = {
                clockIn,
                breakIn,
                breakOut,
                clockOut,
                isRestDay,
                isOnLeave,
                multiplier,
            };
            return Object.assign(Object.assign({}, consolidated), { [date]: this.extendTimelog(employee, basicTimelog) });
        }, {});
        return grouped;
    }
    getRatedDays(calendarDays) {
        return calendarDays.reduce((days, { date, type }) => {
            return Object.assign(Object.assign({}, days), { [moment(date, 'L').format(constants_1.QUERY_DATE_FORMAT)]: type });
        }, {});
    }
    getMultiplier(ratedDays, formattedDate, isRestDay) {
        const type = ratedDays[formattedDate];
        switch (type) {
            case day_type_1.DayType.specialNonWorkingDay:
                return isRestDay
                    ? day_type_1.DayType.specialNonWorkingRestDay
                    : day_type_1.DayType.specialNonWorkingDay;
            case day_type_1.DayType.regularHoliday:
                return isRestDay
                    ? day_type_1.DayType.regularHoliday
                    : day_type_1.DayType.regularHolidayRestDay;
            default:
                return isRestDay ? day_type_1.DayType.restDay : day_type_1.DayType.regularWorkingDay;
        }
    }
    getActionLogs(timelogs) {
        const defaultReturn = {
            clockIn: undefined,
            clockOut: undefined,
            breakIn: undefined,
            breakOut: undefined,
        };
        if (!timelogs) {
            return defaultReturn;
        }
        let clockInList = timelogs.filter(v => 'clockIn' === lodash_1.camelCase(v.type));
        clockInList = lodash_1.orderBy(clockInList, ['createTime'], ['desc']);
        let clockOutList = timelogs.filter(v => 'clockOut' === lodash_1.camelCase(v.type));
        clockOutList = lodash_1.orderBy(clockOutList, ['createTime'], ['asc']);
        timelogs = lodash_1.concat(clockInList, clockOutList);
        return timelogs.reduce((col, doc) => (Object.assign(Object.assign({}, col), { [lodash_1.camelCase(doc.type)]: doc.time })), defaultReturn);
    }
    isRestDay(date, restDays) {
        const dayName = moment(date, 'L').format('dddd');
        return restDays[dayName] === true;
    }
    isOnLeave(date, leaves) {
        const leaveRecord = leaves.find(({ start }) => moment(start, 'L').isSame(moment(date, constants_1.QUERY_DATE_FORMAT), 'd'));
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
    createDatesFromRange(dateFrom, dateTo) {
        const from = moment(dateFrom, constants_1.QUERY_DATE_FORMAT);
        const to = moment(dateTo, constants_1.QUERY_DATE_FORMAT);
        const diff = to.diff(from, 'd');
        let dates = [from.format('L')];
        for (let v = 1; v <= diff; v++) {
            dates = [...dates, from.add(1, 'd').format('L')];
        }
        return dates;
    }
    async generateTemplate(params) {
        const { dateFrom, dateTo, siteId } = params;
        const site = await this.siteService.get(siteId);
        const { name } = site;
        const dates = this.createDateRange(dateFrom, dateTo).map(date => moment(date, constants_1.QUERY_DATE_FORMAT).format('MMM DD, YYYY'));
        const dateRange = [];
        dates.forEach(date => {
            dateRange.push(date);
            dateRange.push('');
        });
        const headers = [
            ['Employee Attendance'],
            [
                `${moment(dateFrom, constants_1.QUERY_DATE_FORMAT).format('MMM DD, YYYY')} - ${moment(dateTo, constants_1.QUERY_DATE_FORMAT).format('MMM DD, YYYY')}`,
            ],
            [],
            ['Site Id', siteId],
            ['Site Name', name],
            [],
            ['Employee Id', 'Name'],
        ];
        headers[headers.length - 1] = lodash_1.concat(headers[headers.length - 1], dateRange);
        const timelogRemarks = [];
        timelogRemarks.unshift(['---'], ['---']);
        dates.forEach(() => {
            timelogRemarks.push(['IN'], ['OUT']);
        });
        headers.push(timelogRemarks);
        const ws = XLSX.utils.aoa_to_sheet(headers, { cellStyles: true });
        const merges = [];
        let dateStartCellIdx = 2;
        headers[headers.length - 2].forEach(() => {
            merges.push({
                s: { r: headers.length - 2, c: dateStartCellIdx },
                e: { r: headers.length - 2, c: ++dateStartCellIdx },
            });
            dateStartCellIdx++;
        });
        if (!ws['!merges'])
            ws['!merges'] = [];
        ws['!merges'] = merges;
        const employeeList = await this.employeeService.getList();
        const data = [];
        lodash_1.orderBy(employeeList, ['lastName'], ['asc']).forEach(employee => {
            const { employeeId, lastName, firstName } = employee;
            data.push({ employeeId, employeeName: `${lastName}, ${firstName}` });
        });
        XLSX.utils.sheet_add_json(ws, data, {
            header: ['employeeId', 'employeeName'],
            skipHeader: true,
            origin: headers.length,
        });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, ws, 'sheet');
        return XLSX.write(workbook, { type: 'buffer' });
    }
    async importFromFile(file, user) {
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const wsname = workbook.SheetNames[0];
        const sheet = workbook.Sheets[wsname];
        const sheetRows = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            blankrows: false,
            raw: false,
        });
        const date = sheetRows[1][0].split(' - ');
        const dates = this.createDateRange(moment(Date.parse(date[0])).format(constants_1.QUERY_DATE_FORMAT), moment(Date.parse(date[1])).format(constants_1.QUERY_DATE_FORMAT));
        const getSite = row => row.find(r => r.toLowerCase() === 'site id');
        const site = sheetRows.find(row => getSite(row));
        const siteId = site[site.length - 1];
        let timelogEntities = await Promise.all(sheetRows.splice(6).map(async (row) => {
            const entities = await this.generateTimelogEntities({
                site: siteId,
                dates,
                row,
                userId: user.id,
            });
            return entities;
        }));
        timelogEntities = timelogEntities.reduce((col, doc) => [...col, ...doc], []);
        return this.repository.save(this.repository.create(timelogEntities));
    }
    createDateRange(dateFrom, dateTo) {
        const isoDateFrom = moment(dateFrom, constants_1.QUERY_DATE_FORMAT).format('L');
        const isoDateTo = moment(dateTo, constants_1.QUERY_DATE_FORMAT).format('L');
        return this.createDatesFromRange(isoDateFrom, isoDateTo);
    }
    async generateTimelogEntities(params) {
        const { site, dates, row, userId } = params;
        const employee = await this.employeeService.checkIfEmployeeIdExists(row[0]);
        let dateRangeIndx = 0;
        const entities = row.splice(2).map((value, index) => {
            const date = dates[dateRangeIndx];
            let type = 'clock-in';
            if (0 !== index % 2) {
                type = 'clock-out';
                dateRangeIndx++;
            }
            let time = null, remarks = null;
            const momentValue = moment(value, 'h:mm a');
            if (momentValue.isValid()) {
                time = momentValue.format('h:mm a');
            }
            else {
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
};
TimelogService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(timelog_entity_1.TimelogEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        leave_service_1.LeaveService,
        employee_service_1.EmployeeService,
        calendar_service_1.CalendarService,
        company_service_1.CompanyService,
        site_service_1.SiteService])
], TimelogService);
exports.TimelogService = TimelogService;
//# sourceMappingURL=timelog.service.js.map