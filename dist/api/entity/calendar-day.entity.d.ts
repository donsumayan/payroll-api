import { DayType } from '../constant/day-type';
import { BaseEntity } from './base.entity';
export declare class CalendarDayEntity extends BaseEntity {
    name: string;
    date: Date;
    type: DayType;
}
