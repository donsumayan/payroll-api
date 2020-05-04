import { Repository } from 'typeorm';
import { CompanyEntity } from '../entity/company/company.entity';
import { CoreService } from './core.service';
export declare class CompanyService extends CoreService<CompanyEntity> {
    readonly companyRepository: Repository<CompanyEntity>;
    constructor(companyRepository: Repository<CompanyEntity>);
    get(id: string): Promise<CompanyEntity>;
}
