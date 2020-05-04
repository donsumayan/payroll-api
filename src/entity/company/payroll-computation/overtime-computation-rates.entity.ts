import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { RateEntity } from '../../rate.entity';
import { OvertimeComputationEntity } from './overtime-computation.entity';

@Entity('OVERTIME_COMPUTATION_RATES')
export class OvertimeComputationRateEntity extends BaseEntity {
  @ManyToOne(
    () => OvertimeComputationEntity,
    overtimeComputation => overtimeComputation.id
  )
  @JoinColumn({ name: 'OVERTIME_COMPUTATION_ID' })
  overtimeComputation: OvertimeComputationEntity;

  @ManyToOne(
    () => RateEntity,
    rate => rate.id,
    { eager: true }
  )
  @JoinColumn({ name: 'RATES_ID' })
  rate: RateEntity;

  @Column({ name: 'IS_SELECTED', default: 0 })
  selected: boolean;
}
