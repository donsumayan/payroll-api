import { CompanyEntity } from './company.entity';
export declare class TaxComputationEntity {
    id: string;
    nonTaxExemptionCeling: number;
    isPreAnnualized: string;
    preAnnualizationStart: string;
    is13thMonthIncluded: boolean;
    deminimisExemptionCeling: number;
    company: CompanyEntity;
}
