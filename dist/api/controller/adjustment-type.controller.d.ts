import { AdjustmentTypeEntity } from '../entity/company/adjustment/adjustment-type.entity';
import { AdjustmentTypeService } from '../service/adjustment-type.service';
import { BaseController } from './base.controller';
export declare class AdjustmentTypeController extends BaseController<AdjustmentTypeEntity> {
    readonly adjustmentTypeService: AdjustmentTypeService;
    constructor(adjustmentTypeService: AdjustmentTypeService);
}
