import { CompanyAdjustmentEntity } from '../entity/company/adjustment/company-adjustment.entity';
import { CompanyAdjustmentService } from '../service/company-adjustment.service';
import { BaseController } from './base.controller';
export declare class CompanyAdjustmentController extends BaseController<CompanyAdjustmentEntity> {
    readonly companyAdjustmentService: CompanyAdjustmentService;
    constructor(companyAdjustmentService: CompanyAdjustmentService);
}
