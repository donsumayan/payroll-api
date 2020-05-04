import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileEntity } from '../entity/file.entity';
import { CoreService } from './core.service';

@Injectable()
export class FileService extends CoreService<FileEntity> {
  constructor(
    @InjectRepository(FileEntity)
    readonly repository: Repository<FileEntity>
  ) {
    super(repository);
  }
}
