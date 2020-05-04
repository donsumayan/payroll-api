import { BaseEntity } from '../../base.entity';
import { AdjustmentTypeEntity } from './adjustment-type.entity';
export declare class CompanyAdjustmentEntity extends BaseEntity {
    name: string;
    code: string;
    amount: number;
    appliedBeforeTax: boolean;
    taxable: boolean;
    maxAmount: number;
    remarks: string;
    amtProvidedPerPeriod: boolean;
    type: AdjustmentTypeEntity | string;
}
