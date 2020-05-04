import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdjustmentTypeEntity } from '../entity/company/adjustment/adjustment-type.entity';
import { CoreService } from './core.service';

@Injectable()
export class AdjustmentTypeService extends CoreService<AdjustmentTypeEntity> {
  constructor(
    @InjectRepository(AdjustmentTypeEntity)
    readonly adjustmentTypeRepository: Repository<AdjustmentTypeEntity>
  ) {
    super(adjustmentTypeRepository);
  }
}
