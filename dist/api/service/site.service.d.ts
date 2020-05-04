import { Repository } from 'typeorm';
import { SiteEntity } from '../entity/site.entity';
import { CoreService } from './core.service';
export declare class SiteService extends CoreService<SiteEntity> {
    readonly siteRepository: Repository<SiteEntity>;
    constructor(siteRepository: Repository<SiteEntity>);
}
