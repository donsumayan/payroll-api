import { Repository } from 'typeorm';
import { CompanyAdjustmentEntity } from '../entity/company/adjustment/company-adjustment.entity';
import { CoreService } from './core.service';
export declare class CompanyAdjustmentService extends CoreService<CompanyAdjustmentEntity> {
    readonly companyAdjustmentRepository: Repository<CompanyAdjustmentEntity>;
    constructor(companyAdjustmentRepository: Repository<CompanyAdjustmentEntity>);
}
