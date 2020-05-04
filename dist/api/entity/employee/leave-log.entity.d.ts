import { LeaveStatus, LeaveType } from '../../constant/leave';
import { BaseEntity } from '../base.entity';
import { EmployeeEntity } from './employee.entity';
export declare class LeaveLogsEntity extends BaseEntity {
    start: string;
    end: string;
    hours: number;
    type: LeaveType;
    reason: string;
    status: LeaveStatus;
    approvedBy: string;
    withPay: boolean;
    employee: EmployeeEntity;
    employeeId: string;
}
