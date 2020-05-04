import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { IncomeSourceEntity } from '../income-source.entity';
import { NewHireProratedComputationEntity } from './new-hire-prorated-computation.entity';

@Entity('NEW_HIRE_PRORATED_INCOME_SOURCE')
export class NewHireProratedIncomeSourceEntity extends BaseEntity {
  @ManyToOne(
    () => NewHireProratedComputationEntity,
    newHireProratedComputation => newHireProratedComputation.id
  )
  @JoinColumn({ name: 'NEW_HIRE_PRORATED_COMPUTATION_ID' })
  newHireProratedComputation: NewHireProratedComputationEntity;

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
