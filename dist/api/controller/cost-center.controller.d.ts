import { CostCenterEntity } from '../entity/cost-center.entity';
import { CostCenterService } from '../service/cost-center.service';
import { BaseController } from './base.controller';
export declare class CostCenterController extends BaseController<CostCenterEntity> {
    readonly costCenterService: CostCenterService;
    constructor(costCenterService: CostCenterService);
}
