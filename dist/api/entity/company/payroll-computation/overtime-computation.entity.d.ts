import { BaseEntity } from '../../base.entity';
import { OvertimeComputationBasisEntity } from './overtime-computation-basis.entity';
import { OvertimeComputationRateEntity } from './overtime-computation-rates.entity';
import { PayrollComputationEntity } from './payroll-computation.entity';
export declare class OvertimeComputationEntity extends BaseEntity {
    payrollComputation: PayrollComputationEntity;
    computationBasis: OvertimeComputationBasisEntity[];
    rates: OvertimeComputationRateEntity[];
}
