import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { SalaryDetailsEntity } from './salary-details.entity';

@Entity('DE_MINIMIS_BENEFITS')
export class DeMinimisBenefitEntity extends BaseEntity {
  @Column({ name: 'AMOUNT', type: 'float' })
  amount: number;

  @Column({ name: 'TYPE' })
  type: string;

  @ManyToOne(
    () => SalaryDetailsEntity,
    sde => sde.id,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'SALARY_DETAILS_ID' })
  salaryEntity: SalaryDetailsEntity;
}
