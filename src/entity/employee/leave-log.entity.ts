import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { LeaveStatus, LeaveType } from '../../constant/leave';
import { BaseEntity } from '../base.entity';
import { EmployeeEntity } from './employee.entity';

@Entity('LEAVE_LOGS')
export class LeaveLogsEntity extends BaseEntity {
  @Column({ name: 'LEAVE_START', type: 'timestamp', default: null })
  start: string;

  @Column({ name: 'LEAVE_END', type: 'timestamp', default: null })
  end: string;

  @Column({ name: 'HOURS', type: 'double' })
  hours: number;

  @Column({
    name: 'TYPE',
    type: 'enum',
    enum: LeaveType,
    default: LeaveType.VL,
  })
  type: LeaveType;

  @Column({ name: 'REASON', nullable: true })
  reason: string;

  @Column({
    name: 'STATUS',
    type: 'enum',
    enum: LeaveStatus,
    default: LeaveStatus.APPROVED,
  })
  status: LeaveStatus;

  @Column({ name: 'APPROVED_BY', nullable: true })
  approvedBy: string;

  @Column({ name: 'WITH_PAY', default: 0 })
  withPay: boolean;

  @ManyToOne(
    () => EmployeeEntity,
    employee => employee.id
  )
  @JoinColumn({ name: 'EMP_ID' })
  employee: EmployeeEntity;

  @Column({ name: 'EMP_ID' })
  employeeId: string;
}
