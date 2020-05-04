import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';
@Entity('ROLE')
export class RoleEntity extends BaseEntity {
  @Column({ name: 'ROLE_NAME' })
  name: string;

  @Column({ name: 'DESCRIPTION' })
  description: string;

  @Column({ name: 'ACCESS_TYPE', type: 'text' })
  access: string;
}
