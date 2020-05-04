import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdjustmentTypeController } from '../controller/adjustment-type.controller';
import { CompanyAdjustmentController } from '../controller/company-adjustment.controller';
import { CompanyController } from '../controller/company.controller';
import { IncomeSourceController } from '../controller/income-source.controller';
import { RateTablesController } from '../controller/rate-tables.controller';
import { AdjustmentTypeEntity } from '../entity/company/adjustment/adjustment-type.entity';
import { CompanyAdjustmentEntity } from '../entity/company/adjustment/company-adjustment.entity';
import { CompanyEntity } from '../entity/company/company.entity';
import { IncomeSourceEntity } from '../entity/company/income-source.entity';
import { RateTableEntity } from '../entity/rate-table.entity';
import { RateEntity } from '../entity/rate.entity';
import { AdjustmentTypeService } from '../service/adjustment-type.service';
import { CompanyAdjustmentService } from '../service/company-adjustment.service';
import { CompanyService } from '../service/company.service';
import { IncomeSourceService } from '../service/income-source.service';
import { RateTableService } from '../service/rate-tables.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      RateEntity,
      RateTableEntity,
      IncomeSourceEntity,
      CompanyAdjustmentEntity,
      AdjustmentTypeEntity,
    ]),
  ],
  controllers: [
    CompanyController,
    RateTablesController,
    IncomeSourceController,
    CompanyAdjustmentController,
    AdjustmentTypeController,
  ],
  providers: [
    CompanyService,
    RateTableService,
    IncomeSourceService,
    CompanyAdjustmentService,
    AdjustmentTypeService,
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
