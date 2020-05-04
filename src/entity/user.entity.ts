import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';

import { BaseEntity } from './base.entity';
import { CompanyEntity } from './company/company.entity';
import { EmployeeEntity } from './employee/employee.entity';
import { RoleEntity } from './role.entity';

@Entity('USER')
export class UserEntity extends BaseEntity {
  @Column({ name: 'USERNAME', unique: true })
  username: string;

  @Column({ name: 'PASSWORD', unique: false, select: false })
  password: string;

  @Column({ name: 'SALT', unique: false, select: false })
  salt: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: 'USER_ROLES' })
  roles: RoleEntity[];

  @OneToOne(
    () => EmployeeEntity,
    employee => employee.id
  )
  @JoinColumn({ name: 'EMP_ID' })
  employee: CompanyEntity;

  @Column({ name: 'EMP_ID', nullable: true })
  employeeId: string;

  @Column({ name: 'COMPANY_ID', unique: false, readonly: true })
  companyId: string;

  @Column({ name: 'FIRST_LOGIN', default: true })
  firstLogin: boolean;
}
