import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyAdjustmentEntity } from '../entity/company/adjustment/company-adjustment.entity';
import { CoreService } from './core.service';

@Injectable()
export class CompanyAdjustmentService extends CoreService<
  CompanyAdjustmentEntity
> {
  constructor(
    @InjectRepository(CompanyAdjustmentEntity)
    readonly companyAdjustmentRepository: Repository<CompanyAdjustmentEntity>
  ) {
    super(companyAdjustmentRepository);
  }
}
