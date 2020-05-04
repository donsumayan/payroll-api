import { IsDefined } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { CivilStatus } from '../../constant/civil-status';
import { Gender } from '../../constant/gender';
import { BaseEntity } from '../base.entity';
import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user.entity';
import { BankDetailsEntity } from './bank-details.entity';
import { ContactEntity } from './contact.entity';
import { DependentsEntity } from './dependents.entity';
import { EmployeeGovernmentNumbersEntity } from './employee-government-numbers.entity';
import { JobDetailsEntity } from './job-details.entity';
import { LeaveCreditsEntity } from './leave-credits.entity';
import { PreviousEmploymentDetailsEntity } from './previous-employment-details.entity';
import { SalaryDetailsEntity } from './salary-details.entity';

@Entity('EMPLOYEE')
export class EmployeeEntity extends BaseEntity {
  @Column({
    name: 'CAN_CALCULATE',
    default: true,
  })
  canCalculate: boolean;

  @Column({
    name: 'EMPLOYEE_ID',
  })
  @IsDefined()
  employeeId: string;

  @Column({
    name: 'FIRST_NAME',
    length: 100,
  })
  @IsDefined()
  firstName: string;

  @Column({
    name: 'MIDDLE_NAME',
    length: 100,
    nullable: true,
  })
  middleName: string;

  @Column({
    name: 'LAST_NAME',
    length: 100,
  })
  @IsDefined()
  lastName: string;

  @Column({
    name: 'GENDER',
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  gender: string;

  @Column({
    name: 'BIRTHDATE',
    default: null,
    nullable: true,
  })
  birthDate: Date;

  @Column({
    name: 'CIVIL_STATUS',
    type: 'enum',
    enum: CivilStatus,
    nullable: true,
  })
  civilStatus: string;

  @OneToOne(
    () => ContactEntity,
    contact => contact.employee,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: true,
    }
  )
  contact: ContactEntity;

  @OneToOne(
    () => SalaryDetailsEntity,
    salaryDetails => salaryDetails.employee,
    { cascade: true }
  )
  salaryDetails: SalaryDetailsEntity;

  @OneToOne(
    () => JobDetailsEntity,
    jobDetails => jobDetails.employee,
    { cascade: true, eager: true }
  )
  jobDetails: JobDetailsEntity;

  @OneToOne(
    () => LeaveCreditsEntity,
    leaveCredits => leaveCredits.employee,
    { cascade: true }
  )
  leaveCredits: LeaveCreditsEntity;

  @OneToOne(
    () => EmployeeGovernmentNumbersEntity,
    governmentNumbers => governmentNumbers.employee,
    { cascade: true }
  )
  governmentNumbers: EmployeeGovernmentNumbersEntity;

  @OneToMany(
    () => DependentsEntity,
    dependents => dependents.employee,
    { cascade: ['insert', 'remove', 'update'] }
  )
  dependents: DependentsEntity;

  @OneToOne(
    () => BankDetailsEntity,
    bd => bd.employee,
    { cascade: ['insert', 'remove', 'update'] }
  )
  bankDetails: BankDetailsEntity;

  @OneToOne(
    () => PreviousEmploymentDetailsEntity,
    ped => ped.employee
  )
  previousEmploymentDetails: PreviousEmploymentDetailsEntity;

  @OneToOne(
    () => UserEntity,
    user => user.employee
  )
  userDetails: UserEntity;

  @ManyToOne(
    () => CompanyEntity,
    company => company.employees,
    { cascade: false }
  )
  @JoinColumn({ name: 'COMPANY_ID' })
  company: CompanyEntity;

  @Column({ name: 'COMPANY_ID' })
  companyId: string;
}
