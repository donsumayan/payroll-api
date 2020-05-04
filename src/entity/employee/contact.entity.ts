import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { EmployeeEntity } from './employee.entity';

@Entity('CONTACT_INFO')
export class ContactEntity extends BaseEntity {
  @Column({ name: 'CONTACT_NUMBER', nullable: true })
  contactNumber: string;

  @Column({ name: 'HOME_ADDRESS', nullable: true })
  homeAddress: string;

  @Column({ name: 'ZIP_CODE', nullable: true })
  zipCode: string;

  @Column({ name: 'EMAIL_ADDRESS', nullable: true })
  emailAddress: string;

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
