import { BaseEntity } from './base.entity';
import { SalaryDetailsEntity } from './employee/salary-details.entity';
import { RateEntity } from './rate.entity';
export declare class RateTableEntity extends BaseEntity {
    name: string;
    description: string;
    salaryDetails: SalaryDetailsEntity[];
    rates: RateEntity[];
}
