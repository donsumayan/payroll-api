import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../base.entity';

@Entity('INCOME_SOURCE')
export class IncomeSourceEntity extends BaseEntity {
  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'IS_DEDUCTIBLE', default: 0 })
  isDeductible: boolean;
}
