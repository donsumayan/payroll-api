import { Repository } from 'typeorm';
import { CalendarDayEntity } from '../entity/calendar-day.entity';
import { CoreService } from './core.service';
export declare class CalendarService extends CoreService<CalendarDayEntity> {
    readonly repository: Repository<CalendarDayEntity>;
    constructor(repository: Repository<CalendarDayEntity>);
    getDates(dates: string[]): Promise<CalendarDayEntity[]>;
}
