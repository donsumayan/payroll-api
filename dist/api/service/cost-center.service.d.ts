import { Repository } from 'typeorm';
import { CostCenterEntity } from '../entity/cost-center.entity';
import { CoreService } from './core.service';
export declare class CostCenterService extends CoreService<CostCenterEntity> {
    readonly costCenterRepository: Repository<CostCenterEntity>;
    constructor(costCenterRepository: Repository<CostCenterEntity>);
}
