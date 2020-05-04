import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeController } from '../controller/employee.controller';
import { EmploymentStatusController } from '../controller/employment-status.controller';
import { GovernmentReferencesController } from '../controller/government-references.controller';
import { LeaveController } from '../controller/leave.controller';
import { ShiftController } from '../controller/shift.controller';
import { TimelogController } from '../controller/timelog.controller';
import { EmployeeSiteEntity } from '../entity/employee/employee-site.entity';
import { EmployeeEntity } from '../entity/employee/employee.entity';
import { EmploymentStatusEntity } from '../entity/employee/employment-status.entity';
import { LeaveLogsEntity } from '../entity/employee/leave-log.entity';
import { TimelogEntity } from '../entity/employee/timelog.entity';
import { ShiftEntity } from '../entity/shift.entity';
import { SiteEntity } from '../entity/site.entity';
import { EmployeeSiteService } from '../service/employee-site.service';
import { EmployeeService } from '../service/employee.service';
import { EmploymentStatusService } from '../service/employment-status.service';
import { GovernmentReferenceService } from '../service/government-references.service';
import { LeaveService } from '../service/leave.service';
import { ShiftService } from '../service/shift.service';
import { SiteService } from '../service/site.service';
import { TimelogService } from '../service/timelog.service';
import { CalendarModule } from './calendar.module';
import { CompanyModule } from './company.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeEntity,
      TimelogEntity,
      EmployeeSiteEntity,
      EmploymentStatusEntity,
      LeaveLogsEntity,
      ShiftEntity,
      SiteEntity,
    ]),
    UserModule,
    CalendarModule,
    CompanyModule,
  ],
  controllers: [
    EmployeeController,
    TimelogController,
    GovernmentReferencesController,
    EmploymentStatusController,
    LeaveController,
    ShiftController,
  ],
  providers: [
    EmployeeService,
    TimelogService,
    EmployeeSiteService,
    GovernmentReferenceService,
    EmploymentStatusService,
    LeaveService,
    ShiftService,
    SiteService,
  ],
  exports: [
    EmployeeService,
    GovernmentReferenceService,
    TimelogService,
    LeaveService,
  ],
})
export class EmployeeModule {}
