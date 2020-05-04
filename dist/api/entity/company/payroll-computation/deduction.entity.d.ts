import { BaseEntity } from '../../base.entity';
import { IncomeSourceEntity } from '../income-source.entity';
import { PayrollComputationEntity } from './payroll-computation.entity';
export declare class DeductionEntity extends BaseEntity {
    payrollComputation: PayrollComputationEntity;
    incomeSource: IncomeSourceEntity | string;
    selected: boolean;
}
