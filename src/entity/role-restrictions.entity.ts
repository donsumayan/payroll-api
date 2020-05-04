import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ActionType } from '../constant/action-type';
import { ACCESS } from '../constant/api-features';
import { BaseEntity } from './base.entity';
import { RoleEntity } from './role.entity';

@Entity('ROLE_RESTRICTIONS')
export class RoleRestrictionsEntity extends BaseEntity {
  @ManyToOne(
    () => RoleEntity,
    role => role.id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'ROLE_ID' })
  role: RoleEntity;

  @Column({
    name: 'FEATURE',
    type: 'enum',
    enum: ACCESS,
  })
  feature: ACCESS;

  @Column({
    name: 'ACTION',
    type: 'enum',
    enum: ActionType,
    default: ActionType.READ,
  })
  action: ActionType;
}
