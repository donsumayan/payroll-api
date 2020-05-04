import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DepartmentEntity } from '../entity/department.entity';
import { CoreService } from './core.service';

@Injectable()
export class DepartmentService extends CoreService<DepartmentEntity> {
  constructor(
    @InjectRepository(DepartmentEntity)
    readonly departmentEntityRepository: Repository<DepartmentEntity>
  ) {
    super(departmentEntityRepository);
  }
}
