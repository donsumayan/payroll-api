import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { IncomeSourceEntity } from '../income-source.entity';
import { Company13thMonthComputationEntity } from './13th-month-computation.entity';

@Entity('COMPANY_13TH_MONTH_COMPUTATION_INCOME_SOURCE')
export class Company13thMonthComputationIncomeSourceEntity extends BaseEntity {
  @ManyToOne(
    () => Company13thMonthComputationEntity,
    company13thMonthComputation => company13thMonthComputation.id
  )
  @JoinColumn({ name: 'COMPANY_13TH_MONTH_COMPUTATION_ID' })
  company13thMonthComputation: Company13thMonthComputationEntity;

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
