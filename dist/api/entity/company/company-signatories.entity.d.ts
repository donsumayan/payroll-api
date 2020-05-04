import { CompanyEntity } from './company.entity';
import { HrSignatoryEntity } from './hr-signatory.entity';
export declare class CompanySignatories {
    id: string;
    admin: HrSignatoryEntity;
    finance: HrSignatoryEntity;
    hr: HrSignatoryEntity;
    company: CompanyEntity;
}
