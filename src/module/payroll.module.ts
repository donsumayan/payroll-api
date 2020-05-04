import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PayrollRunsController } from '../controller/payroll-runs.controller';
import { PayrollController } from '../controller/payroll.controller';
import { LeaveLogsEntity } from '../entity/employee/leave-log.entity';
import { PayrollRunsEntity } from '../entity/payroll-runs.entity';
import { PayrollComputationService } from '../service/payroll-computation.service';
import { PayrollRunsService } from '../service/payroll-runs.service';
import { CalendarModule } from './calendar.module';
import { CompanyModule } from './company.module';
import { EmployeeModule } from './employee.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PayrollRunsEntity, LeaveLogsEntity]),
    EmployeeModule,
    CalendarModule,
    CompanyModule,
  ],
  controllers: [PayrollController, PayrollRunsController],
  providers: [PayrollComputationService, PayrollRunsService],
})
export class PayrollModule {}
