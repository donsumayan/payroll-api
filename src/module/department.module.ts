import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DepartmentController } from '../controller/department.controller';
import { DepartmentEntity } from '../entity/department.entity';
import { DepartmentService } from '../service/department.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
