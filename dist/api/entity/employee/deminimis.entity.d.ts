import { BaseEntity } from '../base.entity';
import { SalaryDetailsEntity } from './salary-details.entity';
export declare class DeMinimisBenefitEntity extends BaseEntity {
    amount: number;
    type: string;
    salaryEntity: SalaryDetailsEntity;
}
