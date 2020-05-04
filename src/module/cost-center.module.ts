import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CostCenterController } from '../controller/cost-center.controller';
import { CostCenterEntity } from '../entity/cost-center.entity';
import { CostCenterService } from '../service/cost-center.service';

@Module({
  imports: [TypeOrmModule.forFeature([CostCenterEntity])],
  controllers: [CostCenterController],
  providers: [CostCenterService],
})
export class CostCenterModule {}
