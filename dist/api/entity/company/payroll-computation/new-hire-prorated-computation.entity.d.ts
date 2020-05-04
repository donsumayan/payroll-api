import { BaseEntity } from '../../base.entity';
import { NewHireProratedIncomeSourceEntity } from './new-hire-prorated-income-src.entity';
import { PayrollComputationEntity } from './payroll-computation.entity';
export declare class NewHireProratedComputationEntity extends BaseEntity {
    prorationMethod: string;
    proratedIncomeSource: NewHireProratedIncomeSourceEntity[];
    payrollComputation: PayrollComputationEntity;
}
