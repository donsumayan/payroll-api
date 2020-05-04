import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { TaxAnnualization } from '../../constant/tax-annualization';
import { BaseEntity } from '../base.entity';
import { TaxComputationEntity } from './tax-computation.entity';

@Entity('TAX_TABLE')
export class TaxTableEntity extends BaseEntity {
  @Column({
    name: 'ANNUALIZATION',
    type: 'enum',
    enum: TaxAnnualization,
    default: TaxAnnualization.NORMAL,
  })
  annualization: string;

  @Column({ name: 'PRE_ANNUALIZATION_MONTH', default: 1 })
  preAnnualizationMonth: number;

  @Column({ name: 'INCLUDE_13TH_MONTH_PAY', default: 0 })
  include13thMonthPay: boolean;

  @OneToOne(
    () => TaxComputationEntity,
    taxComputation => taxComputation.id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'TAX_COMPUTATION_ID' })
  taxComputation: TaxComputationEntity;
}
