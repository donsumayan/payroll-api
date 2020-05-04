import { BaseEntity } from '../base.entity';
import { EmployeeEntity } from '../employee/employee.entity';
import { CompanyContactEntity } from './company-contact.entity';
import { CompanyGovernmentNumbersEntity } from './company-govt-numbers.entity';
import { CompanySignatories } from './company-signatories.entity';
import { PayrollComputationEntity } from './payroll-computation/payroll-computation.entity';
import { TaxComputationEntity } from './tax-computation.entity';
import { WorkPolicyEntity } from './work-policy.entity';
export declare class CompanyEntity extends BaseEntity {
    companyLogoId: string;
    companyName: string;
    natureOfBusiness: string;
    governmentNumbers: CompanyGovernmentNumbersEntity;
    contact: CompanyContactEntity;
    signatories: CompanySignatories;
    workPolicy: WorkPolicyEntity;
    payrollComputation: PayrollComputationEntity;
    taxComputation: TaxComputationEntity;
    passwordExpirationDays: number;
    employees: EmployeeEntity[];
}
