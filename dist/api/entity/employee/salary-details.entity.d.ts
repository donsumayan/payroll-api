import { BaseEntity } from '../base.entity';
import { RateTableEntity } from '../rate-table.entity';
import { DeMinimisBenefitEntity } from './deminimis.entity';
import { EmployeeContributionEntity } from './employee-contribution.entity';
import { EmployeeEntity } from './employee.entity';
export declare class SalaryDetailsEntity extends BaseEntity {
    isMinimumWageEarner: boolean;
    isDailyPaid: boolean;
    cola: number;
    workDaysPerYear: number;
    basicSalary: number;
    deMinimis: DeMinimisBenefitEntity[];
    additionalHdmfContribution: number;
    rateTable: RateTableEntity;
    employee: EmployeeEntity;
    contribution: EmployeeContributionEntity;
}
