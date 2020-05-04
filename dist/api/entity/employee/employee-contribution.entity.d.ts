import { BaseEntity } from '../base.entity';
import { SalaryDetailsEntity } from './salary-details.entity';
export declare class EmployeeContributionEntity extends BaseEntity {
    calcSSS: boolean;
    eeSSS: number;
    erSSS: number;
    calcPHIC: boolean;
    eePHIC: number;
    erPHIC: number;
    calcHDMF: boolean;
    eeHDMF: number;
    erHDMF: number;
    salaryDetails: SalaryDetailsEntity;
}
