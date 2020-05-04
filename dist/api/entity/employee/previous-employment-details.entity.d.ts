import { BaseEntity } from '../base.entity';
import { EmployeeEntity } from './employee.entity';
export declare class PreviousEmploymentDetailsEntity extends BaseEntity {
    hasPreviousEmployment: boolean;
    nonTax13thMonth: number;
    nonTaxOtherBonus: number;
    nonTaxSalaries: number;
    prev13thMonth: number;
    otherBonus: number;
    taxableGross: number;
    taxWithheld: number;
    govDeductions: number;
    deMinimis: number;
    taxableCompensation: number;
    monetizedLeave: number;
    employee: EmployeeEntity;
}
