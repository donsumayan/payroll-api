import { IsDefined } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { CostCenterEntity } from '../cost-center.entity';
import { DepartmentEntity } from '../department.entity';
import { PayGroupEntity } from '../pay-group.entity';
import { ShiftEntity } from '../shift.entity';
import { EmployeeEntity } from './employee.entity';

@Entity('JOB_DETAILS')
export class JobDetailsEntity extends BaseEntity {
  @Column({ name: 'JOB_TITLE', nullable: true })
  jobTitle: string;

  @Column({ name: 'HIRE_DATE', nullable: true })
  hireDate: string;

  @Column({ name: 'EMPLOYMENT_STATUS', default: 'INACTIVE' })
  employmentStatus: string;

  @OneToOne(
    () => EmployeeEntity,
    employee => employee.jobDetails
  )
  @JoinColumn({ name: 'EMP_ID' })
  employee: EmployeeEntity;

  @Column({ name: 'REST_DAYS' })
  restDays: string;

  @ManyToOne(() => DepartmentEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'DEPT_ID' })
  department: DepartmentEntity;

  @IsDefined()
  @Column({ name: 'DEPT_ID' })
  departmentId: string;

  @ManyToOne(() => CostCenterEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'COST_CENTER_ID' })
  costCenter: CostCenterEntity;

  @IsDefined()
  @Column({ name: 'COST_CENTER_ID' })
  costCenterId: string;

  @ManyToOne(() => PayGroupEntity, {
    eager: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'PAY_GROUP_ID',
  })
  payGroup: PayGroupEntity;

  @IsDefined()
  @Column({ name: 'PAY_GROUP_ID' })
  payGroupId: string;

  @ManyToOne(() => ShiftEntity)
  @JoinColumn({ name: 'SHIFT_ID' })
  shift: ShiftEntity;

  @IsDefined()
  @Column({ name: 'SHIFT_ID' })
  shiftId: string;
}
