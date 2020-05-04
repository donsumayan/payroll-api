import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShiftEntity } from '../entity/shift.entity';
import { CoreService } from './core.service';

@Injectable()
export class ShiftService extends CoreService<ShiftEntity> {
  constructor(
    @InjectRepository(ShiftEntity)
    readonly ShiftRepository: Repository<ShiftEntity>
  ) {
    super(ShiftRepository);
  }
}
