import { BaseEntity } from '../base.entity';
import { EmployeeEntity } from './employee.entity';
export declare class LeaveCreditsEntity extends BaseEntity {
    sickLeave: number;
    vacationLeave: number;
    credit: number;
    employee: EmployeeEntity;
}
