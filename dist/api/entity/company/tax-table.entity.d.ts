import { BaseEntity } from '../base.entity';
import { TaxComputationEntity } from './tax-computation.entity';
export declare class TaxTableEntity extends BaseEntity {
    annualization: string;
    preAnnualizationMonth: number;
    include13thMonthPay: boolean;
    taxComputation: TaxComputationEntity;
}
