import { BaseEntity } from '../../base.entity';
import { JobDetailsEntity } from '../../employee/job-details.entity';
import { PayrollComputationEntity } from './payroll-computation.entity';
export declare class WeekDayEntity extends BaseEntity {
    isSelected: boolean;
    name: string;
    parentId: string;
}
export declare class EmployeeRestDayEntity extends WeekDayEntity {
    jobDetails: JobDetailsEntity;
}
export declare class DefaultRestDayEntity extends WeekDayEntity {
    payrollComputation: PayrollComputationEntity;
}
