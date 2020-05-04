import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { PayrollComputationEntity } from './payroll-computation.entity';

@Entity('FINAL_PAY_COMPUTATION')
export class FinalPayComputationEntity extends BaseEntity {
  @Column({ name: 'DEDUCT_ABSENT', default: 0, nullable: true })
  deductAbsent: boolean;

  @Column({ name: 'DEDUCT_LATE_OR_UNDERTIME', default: 0, nullable: true })
  deductLateOrUndertime: boolean;

  @Column({ name: 'INCLUDE_13TH_MONTH_PAY', default: 0, nullable: true })
  include13thMonthPay: boolean;

  @OneToOne(
    () => PayrollComputationEntity,
    payrollComputation => payrollComputation.id
  )
  @JoinColumn({ name: 'PAYROLL_COMPUTATION_ID' })
  payrollComputation: PayrollComputationEntity;
}
