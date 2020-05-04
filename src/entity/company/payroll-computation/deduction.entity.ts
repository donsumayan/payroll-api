import { Column, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { IncomeSourceEntity } from '../income-source.entity';
import { PayrollComputationEntity } from './payroll-computation.entity';

export class DeductionEntity extends BaseEntity {
  @ManyToOne(
    () => PayrollComputationEntity,
    payrollComputation => payrollComputation.id
  )
  @JoinColumn({ name: 'PAYROLL_COMPUTATION_ID' })
  payrollComputation: PayrollComputationEntity;

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
