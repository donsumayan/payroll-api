import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('COST_CENTER')
export class CostCenterEntity extends BaseEntity {
  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'CODE' })
  code: string;

  @Column({ name: 'REMARKS', nullable: true })
  remarks: string;
}
