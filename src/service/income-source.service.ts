import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IncomeSourceEntity } from '../entity/company/income-source.entity';
import { CoreService } from './core.service';

@Injectable()
export class IncomeSourceService extends CoreService<IncomeSourceEntity> {
  constructor(
    @InjectRepository(IncomeSourceEntity)
    readonly incomeSoruceRepository: Repository<IncomeSourceEntity>
  ) {
    super(incomeSoruceRepository);
  }
}
