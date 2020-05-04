import { IsDefined, IsEmail } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CompanyEntity } from './company.entity';

@Entity('COMPANY_CONTACT_INFO')
export class CompanyContactEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'FIRST_ADDRESS' })
  @IsDefined()
  firstAddress: string;

  @Column({ name: 'SECOND_ADDRESS' })
  @IsDefined()
  secondAddress: string;

  @Column({ name: 'ZIP_CODE' })
  @IsDefined()
  zipCode: string;

  @Column({ name: 'REGION' })
  @IsDefined()
  region: string;

  @Column({ name: 'EMAIL_ADDRESS' })
  @IsDefined()
  @IsEmail()
  emailAddress: string;

  @Column({ name: 'PHONE' })
  @IsDefined()
  phone: string;

  @Column({ name: 'FAX', nullable: true })
  fax: string;

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
