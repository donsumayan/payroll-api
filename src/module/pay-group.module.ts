import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PayGroupController } from '../controller/pay-group.controller';
import { PayGroupEntity } from '../entity/pay-group.entity';
import { PayGroupService } from '../service/pay-group.service';

@Module({
  imports: [TypeOrmModule.forFeature([PayGroupEntity])],
  controllers: [PayGroupController],
  providers: [PayGroupService],
  exports: [PayGroupService],
})
export class PayGroupModule {}
