import { CompanyEntity } from './company.entity';
export declare class CompanyContactEntity {
    id: string;
    firstAddress: string;
    secondAddress: string;
    zipCode: string;
    region: string;
    emailAddress: string;
    phone: string;
    fax: string;
    company: CompanyEntity;
}
