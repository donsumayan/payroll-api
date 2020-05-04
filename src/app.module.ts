import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './controller/app.controller';
import { AuthModule } from './module/auth.module';
import { BankModule } from './module/bank.module';
import { CalendarModule } from './module/calendar.module';
import { CompanyModule } from './module/company.module';
import { CostCenterModule } from './module/cost-center.module';
import { DepartmentModule } from './module/department.module';
import { EmployeeModule } from './module/employee.module';
import { FileModule } from './module/file.module';
import { MailModule } from './module/mail.module';
import { PayGroupModule } from './module/pay-group.module';
import { PayrollModule } from './module/payroll.module';
import { SiteModule } from './module/site.module';
import { UserModule } from './module/user.module';

const port = +process.env.DB_PORT;
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;
const synchronize = !!process.env.SYNC;
const SnakeNamingStrategy = require('typeorm-naming-strategies')
  .SnakeNamingStrategy;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      port,
      username,
      password,
      database,
      entities: ['dist/**/*.entity.js'],
      synchronize,
      namingStrategy: new SnakeNamingStrategy(),
      charset: 'utf8mb4',
      // logging: true,
      // dropSchema: true,
    }),

    HttpModule,

    // api modules
    AuthModule,
    EmployeeModule,
    FileModule,
    DepartmentModule,
    UserModule,
    PayGroupModule,
    UserModule,
    CostCenterModule,
    CompanyModule,
    BankModule,
    SiteModule,
    PayrollModule,
    MailModule,
    CalendarModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
