import { BaseEntity } from '../../base.entity';
import { RateEntity } from '../../rate.entity';
import { OvertimeComputationEntity } from './overtime-computation.entity';
export declare class OvertimeComputationRateEntity extends BaseEntity {
    overtimeComputation: OvertimeComputationEntity;
    rate: RateEntity;
    selected: boolean;
}
