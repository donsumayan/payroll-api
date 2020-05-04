import { DeductionType } from '../constant/deduction-type';
import { BaseEntity } from './base.entity';
import { EmployeeEntity } from './employee/employee.entity';
export declare class PayrollRunsEntity extends BaseEntity {
    transactionDate: Date;
    dateFrom: string;
    dateTo: string;
    status: string;
    employees: EmployeeEntity[];
    computeDeMinimis: DeductionType;
    computeHDMF: DeductionType;
    computePHIC: DeductionType;
    computeSSS: DeductionType;
    description: string;
}
