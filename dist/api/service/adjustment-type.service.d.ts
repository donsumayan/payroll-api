import { Repository } from 'typeorm';
import { AdjustmentTypeEntity } from '../entity/company/adjustment/adjustment-type.entity';
import { CoreService } from './core.service';
export declare class AdjustmentTypeService extends CoreService<AdjustmentTypeEntity> {
    readonly adjustmentTypeRepository: Repository<AdjustmentTypeEntity>;
    constructor(adjustmentTypeRepository: Repository<AdjustmentTypeEntity>);
}
