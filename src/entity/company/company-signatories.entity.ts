import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AdminSignatoryEntity } from './admin-signatory.entity';
import { CompanyEntity } from './company.entity';
import { FinanceSignatoryEntity } from './finance-signatory.entity';
import { HrSignatoryEntity } from './hr-signatory.entity';

@Entity('COMPANY_SIGNATORIES')
export class CompanySignatories {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @OneToOne(
    () => AdminSignatoryEntity,
    adminSignatory => adminSignatory.id,
    {
      cascade: true,
      eager: true,
    }
  )
  @JoinColumn({ name: 'ADMIN_SIGNATORY_ID' })
  admin: HrSignatoryEntity;

  @OneToOne(
    () => FinanceSignatoryEntity,
    financeSignatory => financeSignatory.id,
    {
      cascade: true,
      eager: true,
    }
  )
  @JoinColumn({ name: 'FINANCE_SIGNATORY_ID' })
  finance: HrSignatoryEntity;

  @OneToOne(
    () => HrSignatoryEntity,
    hrSignatory => hrSignatory.id,
    {
      cascade: true,
      eager: true,
    }
  )
  @JoinColumn({ name: 'HR_SIGNATORY_ID' })
  hr: HrSignatoryEntity;

  @OneToOne(
    () => CompanyEntity,
    company => company.id
  )
  @JoinColumn({ name: 'COMPANY_ID' })
  company: CompanyEntity;
}
