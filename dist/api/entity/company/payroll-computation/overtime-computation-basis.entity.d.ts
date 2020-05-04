import { BaseEntity } from '../../base.entity';
import { IncomeSourceEntity } from '../income-source.entity';
import { OvertimeComputationEntity } from './overtime-computation.entity';
export declare class OvertimeComputationBasisEntity extends BaseEntity {
    overtimeComputation: OvertimeComputationEntity;
    incomeSource: IncomeSourceEntity | string;
    selected: boolean;
}
