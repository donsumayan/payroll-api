import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CostCenterEntity } from '../entity/cost-center.entity';
import { CoreService } from './core.service';

@Injectable()
export class CostCenterService extends CoreService<CostCenterEntity> {
  constructor(
    @InjectRepository(CostCenterEntity)
    readonly costCenterRepository: Repository<CostCenterEntity>
  ) {
    super(costCenterRepository);
  }
}
