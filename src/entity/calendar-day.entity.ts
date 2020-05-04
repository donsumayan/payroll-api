import { Column, Entity } from 'typeorm';

import { DayType } from '../constant/day-type';
import { BaseEntity } from './base.entity';

@Entity('CALENDAR_DAYS')
export class CalendarDayEntity extends BaseEntity {
  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'DATE' })
  date: Date;

  @Column({ name: 'TYPE', type: 'enum', enum: DayType })
  type: DayType;
}
