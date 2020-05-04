import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SiteController } from '../controller/site.controller';
import { SiteEntity } from '../entity/site.entity';
import { SiteService } from '../service/site.service';

@Module({
  imports: [TypeOrmModule.forFeature([SiteEntity])],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {}
