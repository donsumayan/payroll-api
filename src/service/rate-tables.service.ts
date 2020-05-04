import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RateTableEntity } from '../entity/rate-table.entity';
import { CoreService } from './core.service';

@Injectable()
export class RateTableService extends CoreService<RateTableEntity> {
  constructor(
    @InjectRepository(RateTableEntity)
    readonly rateTablesRepository: Repository<RateTableEntity>
  ) {
    super(rateTablesRepository);
  }
}
