import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CalendarController } from '../controller/calendar.controller';
import { CalendarDayEntity } from '../entity/calendar-day.entity';
import { CalendarService } from '../service/calendar.service';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarDayEntity])],
  controllers: [CalendarController],
  providers: [CalendarService],
  exports: [CalendarService],
})
export class CalendarModule {}
