import { CompanyEntity } from '../entity/company/company.entity';
import { CompanyService } from '../service/company.service';
import { BaseController } from './base.controller';
export declare class CompanyController extends BaseController<CompanyEntity> {
    readonly companyService: CompanyService;
    constructor(companyService: CompanyService);
}
