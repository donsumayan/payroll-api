import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../base.entity';

@Entity('ADJUSTMENT_TYPE')
export class AdjustmentTypeEntity extends BaseEntity {
  @Column({ name: 'NAME' })
  name: string;
}
