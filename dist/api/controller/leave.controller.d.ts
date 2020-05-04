import { LeaveLogsEntity } from '../entity/employee/leave-log.entity';
import { LeaveService } from '../service/leave.service';
import { BaseController } from './base.controller';
export declare class LeaveController extends BaseController<LeaveLogsEntity> {
    readonly leaveService: LeaveService;
    constructor(leaveService: LeaveService);
    createByEmployee(id: string, request: any, entity: LeaveLogsEntity): Promise<import("../dto/response.dto").ResponseDTO<LeaveLogsEntity>>;
    updateStatus(request: any, id: string): Promise<import("../dto/response.dto").ResponseDTO<LeaveLogsEntity>>;
}
