import { Column } from 'typeorm';

import { BaseEntity } from '../base.entity';

export class SignatoryEntity extends BaseEntity {
  @Column({ name: 'AUTHORIZED_PERSON', nullable: true })
  authorizedPerson: string;

  @Column({ name: 'POSITION_TITLE', nullable: true })
  positionTitle: string;
}
