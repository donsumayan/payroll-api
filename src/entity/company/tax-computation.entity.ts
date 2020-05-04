import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CompanyEntity } from './company.entity';
@Entity('TAX_COMPUTATION')
export class TaxComputationEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'NON_TAX_EXEMPTION_CEILING', type: 'double', nullable: true })
  nonTaxExemptionCeling: number;

  @Column({ name: 'IS_PRE_ANNUALIZED', nullable: true })
  isPreAnnualized: string;

  @Column({ name: 'PRE_ANNUALIZATION_START', nullable: true })
  preAnnualizationStart: string;

  @Column({ name: 'IS_13TH_MONTH_INCLUDED', nullable: true })
  is13thMonthIncluded: boolean;

  @Column({ name: 'DEMINIMIS_EXEMPTION_CEILING', nullable: true })
  deminimisExemptionCeling: number;

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
