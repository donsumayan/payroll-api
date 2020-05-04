import { CompanyEntity } from '../company.entity';
import { Company13thMonthComputationEntity } from './13th-month-computation.entity';
import { AbsentDeductionEntity } from './absent-deduction.entity';
import { FinalPayComputationEntity } from './final-pay-computation.entity';
import { LateDeductionEntity } from './late-deduction.entity';
import { NewHireProratedComputationEntity } from './new-hire-prorated-computation.entity';
import { OvertimeComputationEntity } from './overtime-computation.entity';
export declare class PayrollComputationEntity {
    id: string;
    periodsPerMonth: 1 | 2 | 4;
    statutoryPeriod: string;
    absentDeductions: AbsentDeductionEntity[];
    lateDeductions: LateDeductionEntity[];
    overtimeComputation: OvertimeComputationEntity;
    newHireProratedComputation: NewHireProratedComputationEntity;
    computation13thMonth: Company13thMonthComputationEntity;
    finalPayComputation: FinalPayComputationEntity;
    enableNetPayThreshold: boolean;
    company: CompanyEntity;
}
