import { Entity, JoinColumn, OneToOne } from 'typeorm';

import { GovernmentNumbersEntity } from '../government-numbers.entity';
import { CompanyEntity } from './company.entity';

@Entity('COMPANY_GOVERNMENT_NUMBERS')
export class CompanyGovernmentNumbersEntity extends GovernmentNumbersEntity {
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
