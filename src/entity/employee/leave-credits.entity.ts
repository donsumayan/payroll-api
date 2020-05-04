import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { EmployeeEntity } from './employee.entity';

@Entity('LEAVE_CREDITS')
export class LeaveCreditsEntity extends BaseEntity {
  @Column({ name: 'SICK_LEAVE', type: 'double', nullable: true, default: 0 })
  sickLeave: number;

  @Column({
    name: 'VACATION_LEAVE',
    type: 'double',
    nullable: true,
    default: 0,
  })
  vacationLeave: number;

  @Column({ name: 'CREDIT', type: 'double', nullable: true, default: 0 })
  credit: number;

  @OneToOne(
    () => EmployeeEntity,
    employee => employee.id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'EMP_ID' })
  employee: EmployeeEntity;
}
