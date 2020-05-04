import { IsDefined } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { DeductionType } from '../constant/deduction-type';
import { BaseEntity } from './base.entity';
import { EmployeeEntity } from './employee/employee.entity';

@Entity('PAYROLL_RUNS')
export class PayrollRunsEntity extends BaseEntity {
  @CreateDateColumn()
  transactionDate: Date;

  @Column({ name: 'DATE_FROM' })
  @IsDefined()
  dateFrom: string;

  @Column({ name: 'DATE_TO' })
  @IsDefined()
  dateTo: string;

  @Column({ name: 'STATUS', default: 'PENDING_APPROVAL' })
  status: string;

  @ManyToMany(
    () => EmployeeEntity,
    emp => emp.id,
    { eager: true }
  )
  @JoinTable({ name: 'PAYROLL_EMPLOYEES' })
  employees: EmployeeEntity[];

  @Column({
    name: 'COMPUTE_DE_MINIMIS',
    type: 'enum',
    enum: DeductionType,
    default: DeductionType.FULL,
  })
  computeDeMinimis: DeductionType;

  @Column({
    name: 'COMPUTE_HDMF',
    type: 'enum',
    enum: DeductionType,
    default: DeductionType.FULL,
  })
  computeHDMF: DeductionType;

  @Column({
    name: 'COMPUTE_PHIC',
    type: 'enum',
    enum: DeductionType,
    default: DeductionType.FULL,
  })
  computePHIC: DeductionType;

  @Column({
    name: 'COMPUTE_SSS',
    type: 'enum',
    enum: DeductionType,
    default: DeductionType.FULL,
  })
  computeSSS: DeductionType;

  @Column({
    name: 'DESCRIPTION',
    default: 'Payroll Run',
    nullable: true,
  })
  description: string;
}
