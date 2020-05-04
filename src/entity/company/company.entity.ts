import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { CompanyContactEntity } from './company-contact.entity';
import { CompanyGovernmentNumbersEntity } from './company-govt-numbers.entity';
import { CompanySignatories } from './company-signatories.entity';
import { PayrollComputationEntity } from './payroll-computation/payroll-computation.entity';
import { TaxComputationEntity } from './tax-computation.entity';
import { WorkPolicyEntity } from './work-policy.entity';

@Entity('COMPANY')
export class CompanyEntity extends BaseEntity {
  @Column({ name: 'COMPANY_LOGO_ID', nullable: true })
  companyLogoId: string;

  @Column({ name: 'COMPANY_NAME' })
  companyName: string;

  @Column({ name: 'NATURE_OF_BUSINESS', nullable: true })
  natureOfBusiness: string;

  @OneToOne(
    () => CompanyGovernmentNumbersEntity,
    companyGovernmentNumbers => companyGovernmentNumbers.company,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: true,
    }
  )
  governmentNumbers: CompanyGovernmentNumbersEntity;

  @OneToOne(
    () => CompanyContactEntity,
    contact => contact.company,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: true,
    }
  )
  contact: CompanyContactEntity;

  @OneToOne(
    () => CompanySignatories,
    signatories => signatories.company,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: true,
    }
  )
  signatories: CompanySignatories;

  @OneToOne(
    () => WorkPolicyEntity,
    workPolicy => workPolicy.company,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: true,
    }
  )
  workPolicy: WorkPolicyEntity;

  @OneToOne(
    () => PayrollComputationEntity,
    payrollComputation => payrollComputation.company,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: true,
    }
  )
  payrollComputation: PayrollComputationEntity;

  @OneToOne(
    () => TaxComputationEntity,
    taxComputation => taxComputation.company,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: true,
    }
  )
  taxComputation: TaxComputationEntity;

  @Column({ name: 'PASSWORD_EXPIRATION_DAYS', default: 90 })
  passwordExpirationDays: number;

  @OneToMany(
    () => EmployeeEntity,
    emp => emp.company
  )
  employees: EmployeeEntity[];
}
