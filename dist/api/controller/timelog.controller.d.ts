import { ResponseDTO } from '../dto/response.dto';
import { TimelogEntity } from '../entity/employee/timelog.entity';
import { EmployeeSiteService } from '../service/employee-site.service';
import { TimelogService } from '../service/timelog.service';
import { UserService } from '../service/user.service';
import { BaseController } from './base.controller';
export declare class TimelogController extends BaseController<TimelogEntity> {
    readonly timelogService: TimelogService;
    private userService;
    private employeeSiteService;
    constructor(timelogService: TimelogService, userService: UserService, employeeSiteService: EmployeeSiteService);
    saveLog(request: any, body: Partial<TimelogEntity>): Promise<ResponseDTO<TimelogEntity>>;
    editlog(request: any, body: Partial<TimelogEntity>): Promise<ResponseDTO<TimelogEntity>>;
    save(request: any, type: string, body: any): Promise<ResponseDTO<TimelogEntity>>;
    getListByEmployee(employeeId: string, dateFrom: string, dateTo: string): Promise<ResponseDTO<import("../service/timelog.service").TimelogCollection>>;
    getTemplate(dateFrom: string, dateTo: string, siteId: string, response: any): Promise<void>;
    importTimeSheet(file: any, req: any): Promise<ResponseDTO<TimelogEntity[]>>;
}
