import { BaseEntity } from '../../base.entity';
import { IncomeSourceEntity } from '../income-source.entity';
import { NewHireProratedComputationEntity } from './new-hire-prorated-computation.entity';
export declare class NewHireProratedIncomeSourceEntity extends BaseEntity {
    newHireProratedComputation: NewHireProratedComputationEntity;
    incomeSource: IncomeSourceEntity | string;
    selected: boolean;
}
