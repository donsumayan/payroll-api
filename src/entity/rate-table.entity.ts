import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { SalaryDetailsEntity } from './employee/salary-details.entity';
import { RateEntity } from './rate.entity';

@Entity('RATE_TABLE')
export class RateTableEntity extends BaseEntity {
  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'DESCRIPTION', nullable: true })
  description: string;

  @OneToMany(
    () => SalaryDetailsEntity,
    sd => sd.rateTable
  )
  salaryDetails: SalaryDetailsEntity[];

  @OneToMany(
    () => RateEntity,
    rate => rate.rateTable,
    { eager: true, cascade: true }
  )
  rates: RateEntity[];
}
