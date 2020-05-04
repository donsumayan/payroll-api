import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SiteEntity } from '../entity/site.entity';
import { CoreService } from './core.service';

@Injectable()
export class SiteService extends CoreService<SiteEntity> {
  constructor(
    @InjectRepository(SiteEntity)
    readonly siteRepository: Repository<SiteEntity>
  ) {
    super(siteRepository);
  }
}
