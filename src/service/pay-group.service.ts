import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PayGroupEntity } from '../entity/pay-group.entity';
import { CoreService } from './core.service';

@Injectable()
export class PayGroupService extends CoreService<PayGroupEntity> {
  constructor(
    @InjectRepository(PayGroupEntity)
    readonly repository: Repository<PayGroupEntity>
  ) {
    super(repository);
  }
}
