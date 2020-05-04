import { DeductionType } from '../constant/deduction-type';
import { PayrollRunsEntity } from '../entity/payroll-runs.entity';
export interface DeductionShare {
    employee: number;
    employer: number;
    total: number;
    message?: string;
}
export declare class GovernmentReferenceService {
    getTaxTable(): {
        DAILY: import("../constant/withholding-tax-tables").TaxBracket[];
        MONTHLY: import("../constant/withholding-tax-tables").TaxBracket[];
        SEMI_MONTHLY: import("../constant/withholding-tax-tables").TaxBracket[];
        YEARLY: import("../constant/withholding-tax-tables").TaxBracket[];
    };
    getPHICTable(): import("../constant/philhealth-contribution-table").PhilHealthBracket[];
    getSSSTable(): ({
        lowerLimit: number;
        upperLimit: number;
        msc: number;
        ssEr: number;
        ssEe: number;
        ecEr: number;
        totalEr: number;
        totalEe: number;
        total: number;
    } | {
        lowerLimit: number;
        upperLimit: string;
        msc: number;
        ssEr: number;
        ssEe: number;
        ecEr: number;
        totalEr: number;
        totalEe: number;
        total: number;
    })[];
    getHdmfContributionTable(): (string | number)[][];
    calculateWithholdingTax(basicSalary: number, period: 0 | 1 | 2): number;
    calculateDeduction(key: 'HDMF' | 'PHIC' | 'SSS', basicSalary: number, type: DeductionType): DeductionShare;
    calculateHDMF(basicSalary: number, type: DeductionType): DeductionShare;
    procDeduction(originalValue: number, deductionType: DeductionType): number;
    calculatePHIC(basicSalary: number, type: DeductionType): DeductionShare;
    calculateSSS(basicSalary: number, type: DeductionType): DeductionShare;
    calculateContributions(basicSalary: number, payrollDetails?: Partial<PayrollRunsEntity>): {
        HDMF: DeductionShare;
        PHIC: DeductionShare;
        SSS: DeductionShare;
        totals: DeductionShare;
    };
}
