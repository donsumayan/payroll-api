/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { round, sum } from 'lodash';

import { DayType } from '../constant/day-type';
import { DeductionType } from '../constant/deduction-type';
import { DeMinimisBenefitEntity } from '../entity/employee/deminimis.entity';
import { EmployeeContributionEntity } from '../entity/employee/employee-contribution.entity';
import { EmployeeEntity } from '../entity/employee/employee.entity';
import { SalaryDetailsEntity } from '../entity/employee/salary-details.entity';
import { PayrollRunsEntity } from '../entity/payroll-runs.entity';
import { RateEntity } from '../entity/rate.entity';
import { CompanyService } from './company.service';
import { EmployeeService } from './employee.service';
import {
  DeductionShare,
  GovernmentReferenceService,
} from './government-references.service';
import {
  ExtendedTimelogInfo,
  TimelogCollection,
  TimelogService,
} from './timelog.service';

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

@Injectable()
export class PayrollComputationService {
  constructor(
    private timelogService: TimelogService,
    private govRefService: GovernmentReferenceService,
    private companyService: CompanyService,
    private employeeService: EmployeeService
  ) {}

  calculateTotals(
    salaryDetails: SalaryDetailsEntity,
    details: DayTypePay[],
    deMinimis: DeMinimisBenefitEntity[],
    period: 0 | 1 | 2,
    payrollDetails: Partial<PayrollRunsEntity> = {}
  ) {
    const initial = {
      pay: {
        regularPay: 0,
        overtimePay: 0,
        nightDiffPay: 0,
        nightDiffOtPay: 0,
      },
      hours: {
        regularHrs: 0,
        overtimeHrs: 0,
        nightDiffHrs: 0,
        nightDiffOtHrs: 0,
      },
    };

    const totaled = details.reduce((o, detail) => {
      const { hours, pay } = detail;
      const {
        regularHrs = 0,
        overtimeHrs = 0,
        nightDiffHrs = 0,
        nightDiffOtHrs = 0,
      } = hours;
      const {
        regularPay = 0,
        overtimePay = 0,
        nightDiffPay = 0,
        nightDiffOtPay = 0,
      } = pay;
      return {
        ...o,
        hours: {
          regularHrs: round(o.hours.regularHrs + regularHrs, 2),
          overtimeHrs: round(o.hours.overtimeHrs + overtimeHrs, 2),
          nightDiffHrs: round(o.hours.nightDiffHrs + nightDiffHrs, 2),
          nightDiffOtHrs: round(o.hours.nightDiffOtHrs + nightDiffOtHrs, 2),
        },
        pay: {
          regularPay: round(o.pay.regularPay + regularPay, 2),
          overtimePay: round(o.pay.overtimePay + overtimePay, 2),
          nightDiffPay: round(o.pay.nightDiffPay + nightDiffPay, 2),
          nightDiffOtPay: round(o.pay.nightDiffOtPay + nightDiffOtPay, 2),
        },
      };
    }, initial);

    const totalPayVal = sum(Object.values(totaled.pay));
    const totalPay = round(totalPayVal, 2);

    const deMinimisBenefits = this.calculateDeMinimis(
      deMinimis,
      payrollDetails.computeDeMinimis
    );

    let { contribution } = salaryDetails;

    if (!contribution) {
      contribution = new EmployeeContributionEntity();
      contribution.calcHDMF = true;
      contribution.calcSSS = true;
      contribution.calcPHIC = true;
    }

    const {
      calcHDMF = true,
      calcSSS = true,
      calcPHIC = true,
      eeHDMF,
      eePHIC,
      eeSSS,
      erHDMF,
      erPHIC,
      erSSS,
    } = contribution;

    const deductions = [];
    const contributions: { [key: string]: DeductionShare } = {};
    const { basicSalary } = salaryDetails;

    const {
      computeHDMF = DeductionType.FULL,
      computePHIC = DeductionType.FULL,
      computeSSS = DeductionType.FULL,
    } = payrollDetails;

    const procDeduction = (
      ee: number,
      er: number,
      type: DeductionType
    ): DeductionShare => ({
      employee: this.procDeduction(ee, type),
      employer: this.procDeduction(er, type),
      total: this.procDeduction(ee + er, type),
    });

    const calcDeduction = (
      key: 'HDMF' | 'SSS' | 'PHIC',
      canCalculate: boolean,
      ee: number,
      er: number,
      type: DeductionType
    ) => {
      let deduction: DeductionShare;

      if (canCalculate) {
        deduction = this.govRefService.calculateDeduction(
          key,
          basicSalary,
          type
        );
      } else {
        deduction = procDeduction(ee, er, type);
      }
      contributions[key] = deduction;
    };

    calcDeduction('SSS', calcSSS, eeSSS, erSSS, computeSSS);
    calcDeduction('HDMF', calcHDMF, eeHDMF, erHDMF, computeHDMF);
    calcDeduction('PHIC', calcPHIC, eePHIC, erPHIC, computePHIC);
    contributions.totals = {
      employer: round(eeHDMF + eePHIC + eeSSS, 2),
      employee: round(erHDMF + erPHIC + erSSS, 2),
      total: round(eeHDMF + eePHIC + eeSSS + erHDMF + erPHIC + erSSS, 2),
    };

    // *** ADDITIONAL DEDUCTIONS SHOULD BE ADDED HERE BEFORE SUMATION OF DEDUCTIONS BELOW
    const totalDeductions = sum(deductions);

    const taxableIncome = totalPay - totalDeductions;

    const withholdingTax = this.govRefService.calculateWithholdingTax(
      taxableIncome,
      period
    );

    const netIncome = taxableIncome - withholdingTax;

    return {
      contributions,
      deMinimisBenefits,
      grossIncome: round(totalPay + deMinimisBenefits.total, 2),
      deductions: round(totalDeductions, 2),
      netIncome: round(netIncome, 2),
      totalContributions: round(contributions.totals.employee, 2),
      taxableIncome: round(taxableIncome, 2),
      withholdingTax: round(withholdingTax, 2),
    };
  }

  async calculatePerEmployee(
    employeeId: string,
    dateFrom: string,
    dateTo: string,
    payroll: Partial<PayrollRunsEntity> = {}
  ) {
    const employee = await this.employeeService.get(employeeId);
    employee.company = await this.companyService.get(employee.companyId);
    const { salaryDetails } = employee;
    const { rateTable, deMinimis } = salaryDetails;

    const timelogs = await this.timelogService.consolidateTimelogs(
      employee,
      dateFrom,
      dateTo
    );

    // TODO:: ot application
    // const isOTApproved = true;

    const multipliers = this.consolidateMultipliers(rateTable.rates);

    const hoursRendered = this.consolidateTimelog(
      timelogs,
      employee,
      multipliers
    );

    const days = Object.values(timelogs).length;
    const period = days < 16 ? 2 : 1;
    const totals = this.calculateTotals(
      salaryDetails,
      hoursRendered,
      deMinimis,
      period,
      payroll
    );
    const {
      regDaily,
      regHourly,
      workDaysPerYear,
      workHrsPerDay,
    } = this.calculateRegularWages(employee);

    return {
      employee,
      timelogs,
      hoursRendered,
      totals,
      regDaily: round(regDaily, 2),
      regHourly: round(regHourly, 2),
      workDaysPerYear,
      workHrsPerDay,
    };
  }

  private resolveMultiplier(multiplier: RateEntity) {
    const { regular, overtime, nightDiff, nightDiffOT } = multiplier;
    return {
      regular,
      overtime,
      nightDiff,
      nightDiffOT,
    };
  }

  private consolidateTimelog(
    timelogs: TimelogCollection,
    employee: EmployeeEntity,
    rateCollection: RateCollection
  ) {
    const timelogEntries = Object.entries(timelogs);

    const consolidatedLogs: HoursPerDayCollection = timelogEntries.reduce(
      this.timelogReducer,
      {}
    );

    return Object.keys(consolidatedLogs).map((key: DayType) => {
      const hours = consolidatedLogs[key];

      const multipliers = this.resolveMultiplier(rateCollection[key]);
      const pay = this.calculatePay(hours, employee, multipliers);

      return {
        day: key,
        multipliers,
        hours,
        pay,
      } as DayTypePay;
    });
  }

  private calculatePay(
    log: any,
    employee: EmployeeEntity,
    multipliers: Multipliers
  ) {
    const { regHourly } = this.calculateRegularWages(employee);
    const { regularHrs, overtimeHrs, nightDiffHrs, nightDiffOtHrs } = log;
    const { regular, overtime, nightDiff, nightDiffOT } = multipliers;

    const regularHourlyRate = regHourly * regular;
    const regularPay = round(regularHourlyRate * regularHrs, 2);

    const overtimeHourlyRate = regHourly * overtime;
    const overtimePay = round(overtimeHourlyRate * overtimeHrs, 2);

    const nightDiffRate = regHourly * nightDiff;
    const nightDiffPay = round(nightDiffRate * nightDiffHrs, 2);

    const nightDiffOTRate = regHourly * nightDiffOT;
    const nightDiffOtPay = round(nightDiffOTRate * nightDiffOtHrs, 2);

    return {
      regularPay,
      overtimePay,
      nightDiffPay,
      nightDiffOtPay,
    };
  }

  private timelogReducer(
    currentTotal: any,
    currentTimelog: [string, ExtendedTimelogInfo]
  ): HoursPerDayCollection {
    const [, timelog] = currentTimelog;
    const add = (a = {}, b: ExtendedTimelogInfo) => {
      const {
        regularHrs = 0,
        overtimeHrs = 0,
        nightDiffHrs = 0,
        nightDiffOtHrs = 0,
      } = a[b.multiplier] || {};
      return {
        [b.multiplier]: {
          regularHrs: round(regularHrs + b.regularHrs, 2),
          overtimeHrs: round(overtimeHrs + b.overtimeHrs, 2),
          nightDiffHrs: round(nightDiffHrs + b.nightDiffHrs, 2),
          nightDiffOtHrs: round(nightDiffOtHrs + b.nightDiffOtHrs, 2),
        } as HoursRendered,
      };
    };
    return { ...currentTotal, ...add(currentTotal, timelog) };
  }

  private calculateDeMinimis(
    deMinimis: DeMinimisBenefitEntity[],
    deductionType: DeductionType
  ) {
    const totals = deMinimis.reduce(
      (c, v) => {
        const { isDeleted, amount, type } = v;

        if (isDeleted) {
          return c;
        }

        return {
          list: [
            ...c.list,
            { amount: this.procDeduction(amount, deductionType), type },
          ],
          total: c.total + amount,
        };
      },
      { list: [], total: 0 }
    );

    return {
      list: totals.list,
      total: this.procDeduction(totals.total, deductionType),
    };
  }

  private procDeduction(originalValue: number, deductionType: DeductionType) {
    switch (deductionType) {
      case DeductionType.HALF:
        return round(originalValue / 2, 2);
      case DeductionType.NO:
        return 0;
      case DeductionType.FULL:
      default:
        return round(originalValue, 2);
    }
  }

  private calculateRegularWages(employee: EmployeeEntity) {
    const { jobDetails, salaryDetails, company } = employee;
    const { shift } = jobDetails;
    const { workHrsPerDay } = shift;

    // deduct 1 hour break
    const paidWorkHours = workHrsPerDay - 1;

    const {
      isMinimumWageEarner,
      isDailyPaid,
      basicSalary,
      workDaysPerYear,
    } = salaryDetails;
    const { workPolicy } = company;
    const { workMonthsPerYear } = workPolicy;

    let regHourly = 0;
    let regDaily = 0;

    // DAILY PAID
    if (isMinimumWageEarner || isDailyPaid) {
      regDaily = basicSalary;
      regHourly = regDaily / paidWorkHours;
    }
    // MONTHLY PAID
    else {
      regDaily = (basicSalary * workMonthsPerYear) / workDaysPerYear;
      regHourly = regDaily / paidWorkHours;
    }

    return {
      regHourly: round(regHourly, 2),
      regDaily: round(regDaily, 2),
      workDaysPerYear: round(workDaysPerYear, 2),
      workHrsPerDay: round(workHrsPerDay, 2),
    };
  }

  private consolidateMultipliers(rates: RateEntity[]): RateCollection {
    return rates.reduce((c, rate) => ({ ...c, [rate.name]: rate }), {});
  }
}
