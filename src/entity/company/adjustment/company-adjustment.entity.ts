import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { AdjustmentTypeEntity } from './adjustment-type.entity';

@Entity('COMPANY_ADJUSTMENT')
export class CompanyAdjustmentEntity extends BaseEntity {
  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'CODE' })
  code: string;

  @Column({ name: 'AMOUNT', type: 'double' })
  amount: number;

  @Column({ name: 'APPLIED_BEFORE_TAX', default: 0 })
  appliedBeforeTax: boolean;

  @Column({ name: 'TAXABLE', default: 0 })
  taxable: boolean;

  @Column({ name: 'MAX_AMOUNT', type: 'double' })
  maxAmount: number;

  @Column({ name: 'REMARKS' })
  remarks: string;

  @Column({ name: 'AMT_PROVIDED_PER_PERIOD', default: 0 })
  amtProvidedPerPeriod: boolean;

  @OneToOne(
    () => AdjustmentTypeEntity,
    type => type.id,
    { eager: true }
  )
  @JoinColumn({ name: 'ADJUSTMENT_TYPE_ID' })
  type: AdjustmentTypeEntity | string;
}
