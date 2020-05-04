import { DayType } from '../constant/day-type';
import { DeMinimisBenefitEntity } from '../entity/employee/deminimis.entity';
import { EmployeeEntity } from '../entity/employee/employee.entity';
import { SalaryDetailsEntity } from '../entity/employee/salary-details.entity';
import { PayrollRunsEntity } from '../entity/payroll-runs.entity';
import { RateEntity } from '../entity/rate.entity';
import { CompanyService } from './company.service';
import { EmployeeService } from './employee.service';
import { DeductionShare, GovernmentReferenceService } from './government-references.service';
import { ExtendedTimelogInfo, TimelogCollection, TimelogService } from './timelog.service';
export interface RateCollection {
    [key: string]: RateEntity;
}
export interface Multipliers {
    regular: number;
    overtime: number;
    nightDiff: number;
    nightDiffOT: number;
}
export interface HoursPerDayCollection {
    [key: string]: HoursRendered;
}
export interface HoursRendered {
    regularHrs: number;
    overtimeHrs: number;
    nightDiffHrs: number;
    nightDiffOtHrs: number;
}
export interface DayTypePay {
    day: DayType;
    hours: HoursRendered;
    multipliers: Multipliers;
    pay: PayBreakdown;
}
export interface PayBreakdown {
    regularPay: number;
    overtimePay: number;
    nightDiffPay: number;
    nightDiffOtPay: number;
}
export interface WageDetails {
    log: ExtendedTimelogInfo;
    date: string;
    regularPay: number;
    otPay: number;
    nightDiffPay: number;
    cola: number;
}
export declare class PayrollComputationService {
    private timelogService;
    private govRefService;
    private companyService;
    private employeeService;
    constructor(timelogService: TimelogService, govRefService: GovernmentReferenceService, companyService: CompanyService, employeeService: EmployeeService);
    calculateTotals(salaryDetails: SalaryDetailsEntity, details: DayTypePay[], deMinimis: DeMinimisBenefitEntity[], period: 0 | 1 | 2, payrollDetails?: Partial<PayrollRunsEntity>): {
        contributions: {
            [key: string]: DeductionShare;
        };
        deMinimisBenefits: {
            list: any[];
            total: any;
        };
        grossIncome: any;
        deductions: any;
        netIncome: any;
        totalContributions: any;
        taxableIncome: any;
        withholdingTax: any;
    };
    calculatePerEmployee(employeeId: string, dateFrom: string, dateTo: string, payroll?: Partial<PayrollRunsEntity>): Promise<{
        employee: EmployeeEntity;
        timelogs: TimelogCollection;
        hoursRendered: DayTypePay[];
        totals: {
            contributions: {
                [key: string]: DeductionShare;
            };
            deMinimisBenefits: {
                list: any[];
                total: any;
            };
            grossIncome: any;
            deductions: any;
            netIncome: any;
            totalContributions: any;
            taxableIncome: any;
            withholdingTax: any;
        };
        regDaily: any;
        regHourly: any;
        workDaysPerYear: any;
        workHrsPerDay: any;
    }>;
    private resolveMultiplier;
    private consolidateTimelog;
    private calculatePay;
    private timelogReducer;
    private calculateDeMinimis;
    private procDeduction;
    private calculateRegularWages;
    private consolidateMultipliers;
}
