import { BaseEntity } from '../../base.entity';
import { IncomeSourceEntity } from '../income-source.entity';
import { Company13thMonthComputationEntity } from './13th-month-computation.entity';
export declare class Company13thMonthComputationIncomeSourceEntity extends BaseEntity {
    company13thMonthComputation: Company13thMonthComputationEntity;
    incomeSource: IncomeSourceEntity | string;
    selected: boolean;
}
