import { IsDefined } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { DayType } from '../constant/day-type';
import { BaseEntity } from './base.entity';
import { RateTableEntity } from './rate-table.entity';

@Entity('RATES')
export class RateEntity extends BaseEntity {
  @Column({ name: 'NAME' })
  @IsDefined()
  name: string;

  @Column({ name: 'REGULAR', type: 'double', default: 1 })
  @IsDefined()
  regular: number;

  @Column({ name: 'OVERTIME', type: 'double', default: 1 })
  @IsDefined()
  overtime: number;

  @Column({ name: 'NIGHT_DIFF', type: 'double', default: 1 })
  @IsDefined()
  nightDiff: number;

  @Column({ name: 'NIGHT_DIFF_OT', type: 'double', default: 1 })
  @IsDefined()
  nightDiffOT: number;

  @Column({
    name: 'TYPE',
    type: 'enum',
    enum: DayType,
    nullable: true,
  })
  type: string;

  @ManyToOne(
    () => RateTableEntity,
    rateTable => rateTable.id
  )
  @JoinColumn({ name: 'RATE_TABLE' })
  rateTable: RateTableEntity;
}
