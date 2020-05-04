import { SiteEntity } from '../entity/site.entity';
import { SiteService } from '../service/site.service';
import { BaseController } from './base.controller';
export declare class SiteController extends BaseController<SiteEntity> {
    readonly siteService: SiteService;
    constructor(siteService: SiteService);
}
