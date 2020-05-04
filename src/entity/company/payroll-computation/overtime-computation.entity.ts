import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { OvertimeComputationBasisEntity } from './overtime-computation-basis.entity';
import { OvertimeComputationRateEntity } from './overtime-computation-rates.entity';
import { PayrollComputationEntity } from './payroll-computation.entity';

@Entity('OVERTIME_COMPUTATION')
export class OvertimeComputationEntity extends BaseEntity {
  @OneToOne(
    () => PayrollComputationEntity,
    payrollComputation => payrollComputation.id
  )
  @JoinColumn({ name: 'PAYROLL_COMPUTATION_ID' })
  payrollComputation: PayrollComputationEntity;

  @OneToMany(
    () => OvertimeComputationBasisEntity,
    overTimeComputationBasis => overTimeComputationBasis.overtimeComputation,
    { cascade: true, eager: true }
  )
  computationBasis: OvertimeComputationBasisEntity[];

  @OneToMany(
    () => OvertimeComputationRateEntity,
    overTimeComputationRates => overTimeComputationRates.overtimeComputation,
    { cascade: true, eager: true }
  )
  rates: OvertimeComputationRateEntity[];
}
