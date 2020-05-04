import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { _13THMonthComputationType } from '../../../constant/13th-month-computation-type';
import { BaseEntity } from '../../base.entity';
import { Company13thMonthComputationIncomeSourceEntity } from './13th-month-computation-income-src.entity';
import { PayrollComputationEntity } from './payroll-computation.entity';

@Entity('COMPANY_13TH_MONTH_COMPUTATION')
export class Company13thMonthComputationEntity extends BaseEntity {
  @Column({
    name: 'COMPUTATION_TYPE',
    type: 'enum',
    enum: _13THMonthComputationType,
    default: _13THMonthComputationType.YEAR_TO_DATE,
  })
  computationType: string;

  @Column({ name: 'DEDUCT_ABSENT', default: 0 })
  deductAbsent: boolean;

  @Column({ name: 'DEDUCT_LATE_OR_UNDERTIME', default: 0 })
  deductLateOrUndertime: boolean;

  @OneToMany(
    () => Company13thMonthComputationIncomeSourceEntity,
    computationIncomeSource =>
      computationIncomeSource.company13thMonthComputation,
    { cascade: true, eager: true }
  )
  computationIncomeSource: Company13thMonthComputationIncomeSourceEntity[];

  @OneToOne(
    () => PayrollComputationEntity,
    payrollComputation => payrollComputation.id
  )
  @JoinColumn({ name: 'PAYROLL_COMPUTATION_ID' })
  payrollComputation: PayrollComputationEntity;
}
