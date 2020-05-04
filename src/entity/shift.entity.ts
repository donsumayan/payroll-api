import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('SHIFT')
export class ShiftEntity extends BaseEntity {
  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'DESCRIPTION', nullable: true })
  description: string;

  @Column({ name: 'WORK_HOURS_PER_DAY' })
  workHrsPerDay: number;

  @Column({ name: 'WORK_HRS_START' })
  workHrsStart: string;

  @Column({ name: 'WORK_HRS_END' })
  workHrsEnd: string;

  @Column({ name: 'BREAK_HRS_START' })
  breakHrsStart: string;

  @Column({ name: 'BREAK_HRS_END' })
  breakHrsEnd: string;
}
