import { BaseEntity } from '../../base.entity';
import { Company13thMonthComputationIncomeSourceEntity } from './13th-month-computation-income-src.entity';
import { PayrollComputationEntity } from './payroll-computation.entity';
export declare class Company13thMonthComputationEntity extends BaseEntity {
    computationType: string;
    deductAbsent: boolean;
    deductLateOrUndertime: boolean;
    computationIncomeSource: Company13thMonthComputationIncomeSourceEntity[];
    payrollComputation: PayrollComputationEntity;
}
