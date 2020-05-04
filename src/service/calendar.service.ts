import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CalendarDayEntity } from '../entity/calendar-day.entity';
import { CoreService } from './core.service';

@Injectable()
export class CalendarService extends CoreService<CalendarDayEntity> {
  constructor(
    @InjectRepository(CalendarDayEntity)
    readonly repository: Repository<CalendarDayEntity>
  ) {
    super(repository);
  }

  async getDates(dates: string[]) {
    return this.repository.find({
      where: {
        date: In(dates),
      },
    });
  }
}
