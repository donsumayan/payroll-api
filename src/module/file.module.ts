import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileController } from '../controller/file.controller';
import { FileEntity } from '../entity/file.entity';
import { FileService } from '../service/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
