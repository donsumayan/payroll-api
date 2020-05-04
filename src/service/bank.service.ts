import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BankEntity } from '../entity/bank.entity';
import { CoreService } from './core.service';

@Injectable()
export class BankService extends CoreService<BankEntity> {
  constructor(
    @InjectRepository(BankEntity)
    readonly repository: Repository<BankEntity>
  ) {
    super(repository);
  }
}
