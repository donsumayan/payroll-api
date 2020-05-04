import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { StatutoryPeriodSchedule } from '../../../constant/statutory-period-sched';
import { CompanyEntity } from '../company.entity';
import { Company13thMonthComputationEntity } from './13th-month-computation.entity';
import { AbsentDeductionEntity } from './absent-deduction.entity';
import { FinalPayComputationEntity } from './final-pay-computation.entity';
import { LateDeductionEntity } from './late-deduction.entity';
import { NewHireProratedComputationEntity } from './new-hire-prorated-computation.entity';
import { OvertimeComputationEntity } from './overtime-computation.entity';
import { DefaultRestDayEntity } from './week-day.entity';

@Entity('PAYROLL_COMPUTATION')
export class PayrollComputationEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'PERIOD_PER_MONTH', nullable: true })
  periodsPerMonth: 1 | 2 | 4;

  @Column({
    name: 'STATUTORY_PERIOD',
    type: 'enum',
    enum: StatutoryPeriodSchedule,
    default: StatutoryPeriodSchedule.REGULAR,
    nullable: true,
  })
  statutoryPeriod: string;

  @OneToMany(
    () => AbsentDeductionEntity,
    absentDeduction => absentDeduction.payrollComputation,
    { cascade: true, eager: true }
  )
  absentDeductions: AbsentDeductionEntity[];

  @OneToMany(
    () => LateDeductionEntity,
    lateDeduction => lateDeduction.payrollComputation,
    { cascade: true, eager: true }
  )
  lateDeductions: LateDeductionEntity[];

  @OneToOne(
    () => OvertimeComputationEntity,
    overtimeComputation => overtimeComputation.payrollComputation,
    { cascade: true, eager: true }
  )
  overtimeComputation: OvertimeComputationEntity;

  @OneToOne(
    () => NewHireProratedComputationEntity,
    newHireProratedComputation => newHireProratedComputation.payrollComputation,
    { cascade: true, eager: true }
  )
  newHireProratedComputation: NewHireProratedComputationEntity;

  @OneToOne(
    () => Company13thMonthComputationEntity,
    computation13thMonth => computation13thMonth.payrollComputation,
    { cascade: true, eager: true }
  )
  computation13thMonth: Company13thMonthComputationEntity;

  @OneToOne(
    () => FinalPayComputationEntity,
    finalPayComputation => finalPayComputation.payrollComputation,
    { cascade: true, eager: true }
  )
  finalPayComputation: FinalPayComputationEntity;

  @Column({ name: 'ENABLE_NET_PAY_THRESHOLD', default: 0 })
  enableNetPayThreshold: boolean;

  @OneToOne(
    () => CompanyEntity,
    company => company.id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'COMPANY_ID' })
  company: CompanyEntity;
}
