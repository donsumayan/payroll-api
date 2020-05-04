import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmploymentStatusEntity } from '../entity/employee/employment-status.entity';
import { CoreService } from './core.service';

@Injectable()
export class EmploymentStatusService extends CoreService<
  EmploymentStatusEntity
> {
  constructor(
    @InjectRepository(EmploymentStatusEntity)
    readonly repo: Repository<EmploymentStatusEntity>
  ) {
    super(repo);
  }
}
