import { Repository } from 'typeorm';
import { LeaveLogsEntity } from '../entity/employee/leave-log.entity';
import { CoreService } from './core.service';
export declare class LeaveService extends CoreService<LeaveLogsEntity> {
    readonly leaveLogRepository: Repository<LeaveLogsEntity>;
    constructor(leaveLogRepository: Repository<LeaveLogsEntity>);
    getByEmployeeOnDate(employeeId: string, date: string): Promise<LeaveLogsEntity>;
}
