import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleEntity } from '../entity/role.entity';
import { CoreService } from './core.service';

@Injectable()
export class RoleService extends CoreService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    readonly roleRepository: Repository<RoleEntity>
  ) {
    super(roleRepository);
  }
}
