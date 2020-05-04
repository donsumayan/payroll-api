import { BaseEntity } from '../../base.entity';
import { PayrollComputationEntity } from './payroll-computation.entity';
export declare class FinalPayComputationEntity extends BaseEntity {
    deductAbsent: boolean;
    deductLateOrUndertime: boolean;
    include13thMonthPay: boolean;
    payrollComputation: PayrollComputationEntity;
}
