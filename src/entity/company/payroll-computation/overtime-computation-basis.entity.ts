import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { IncomeSourceEntity } from '../income-source.entity';
import { OvertimeComputationEntity } from './overtime-computation.entity';

@Entity('OVERTIME_COMPUTATION_BASIS')
export class OvertimeComputationBasisEntity extends BaseEntity {
  @ManyToOne(
    () => OvertimeComputationEntity,
    overtimeComputation => overtimeComputation.id
  )
  @JoinColumn({ name: 'OVERTIME_COMPUTATION_ID' })
  overtimeComputation: OvertimeComputationEntity;

  @ManyToOne(
    () => IncomeSourceEntity,
    incomeSource => incomeSource.id,
    { eager: true }
  )
  @JoinColumn({ name: 'INCOME_SOURCE_ID' })
  incomeSource: IncomeSourceEntity | string;

  @Column({ name: 'IS_SELECTED', default: 0 })
  selected: boolean;
}
