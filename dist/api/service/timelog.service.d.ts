import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { DayType } from '../constant/day-type';
import { LeaveStatus, LeaveType } from '../constant/leave';
import { EmployeeEntity } from '../entity/employee/employee.entity';
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
export declare class TimelogService extends CoreService<TimelogEntity> {
    readonly timelogRepository: Repository<TimelogEntity>;
    private leaveService;
    private employeeService;
    private calendarService;
    private companyService;
    private siteService;
    constructor(timelogRepository: Repository<TimelogEntity>, leaveService: LeaveService, employeeService: EmployeeService, calendarService: CalendarService, companyService: CompanyService, siteService: SiteService);
    saveLog(timelog: Partial<TimelogEntity>): Promise<TimelogEntity>;
    getTimelogsByEmployee(id: string, dateFrom: string, dateTo: string): Promise<TimelogCollection>;
    consolidateTimelogs(employee: EmployeeEntity, dateFrom: string, dateTo: string): Promise<TimelogCollection>;
    private extendTimelog;
    private getCalendarDates;
    private getLeaves;
    private getTimelogs;
    private groupTimeLogs;
    private getRatedDays;
    private getMultiplier;
    private getActionLogs;
    private isRestDay;
    private isOnLeave;
    private createDatesFromRange;
    generateTemplate(params: any): Promise<any>;
    importFromFile(file: any, user: UserEntity): Promise<TimelogEntity[]>;
    private createDateRange;
    private generateTimelogEntities;
}
