import { CalendarDayEntity } from '../entity/calendar-day.entity';
import { CalendarService } from '../service/calendar.service';
import { BaseController } from './base.controller';
export declare class CalendarController extends BaseController<CalendarDayEntity> {
    readonly service: CalendarService;
    constructor(service: CalendarService);
}
