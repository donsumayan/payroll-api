import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { ProrationMethod } from '../../../constant/proration-method';
import { BaseEntity } from '../../base.entity';
import { NewHireProratedIncomeSourceEntity } from './new-hire-prorated-income-src.entity';
import { PayrollComputationEntity } from './payroll-computation.entity';

@Entity('NEW_HIRE_PRORATED_COMPUTATION')
export class NewHireProratedComputationEntity extends BaseEntity {
  @Column({
    name: 'PRORATION_METHOD',
    type: 'enum',
    enum: ProrationMethod,
    default: ProrationMethod.MULTIPLE_BY_DAYS_PRESENT,
  })
  prorationMethod: string;

  @OneToMany(
    () => NewHireProratedIncomeSourceEntity,
    proratedIncomeSource => proratedIncomeSource.newHireProratedComputation,
    { cascade: true, eager: true }
  )
  proratedIncomeSource: NewHireProratedIncomeSourceEntity[];

  @OneToOne(
    () => PayrollComputationEntity,
    payrollComputation => payrollComputation.id
  )
  @JoinColumn({ name: 'PAYROLL_COMPUTATION_ID' })
  payrollComputation: PayrollComputationEntity;
}
