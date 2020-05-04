import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('SITE')
export class SiteEntity extends BaseEntity {
  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'DESCRIPTION', nullable: true })
  description: string;

  @Column({ name: 'CONTACT_NUMBER', nullable: true })
  contactNumber: string;

  @Column({ name: 'ADDRESS' })
  address: string;

  @Column({ name: 'ZIP_CODE', nullable: true })
  zipCode: string;
}
