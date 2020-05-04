import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('PAY_GROUP')
export class PayGroupEntity extends BaseEntity {
  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'DESCRIPTION' })
  description: string;
}
