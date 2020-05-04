"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const deduction_type_1 = require("../constant/deduction-type");
const employee_contribution_entity_1 = require("../entity/employee/employee-contribution.entity");
const company_service_1 = require("./company.service");
const employee_service_1 = require("./employee.service");
const government_references_service_1 = require("./government-references.service");
const timelog_service_1 = require("./timelog.service");
let PayrollComputationService = class PayrollComputationService {
    constructor(timelogService, govRefService, companyService, employeeService) {
        this.timelogService = timelogService;
        this.govRefService = govRefService;
        this.companyService = companyService;
        this.employeeService = employeeService;
    }
    calculateTotals(salaryDetails, details, deMinimis, period, payrollDetails = {}) {
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
            const { regularHrs = 0, overtimeHrs = 0, nightDiffHrs = 0, nightDiffOtHrs = 0, } = hours;
            const { regularPay = 0, overtimePay = 0, nightDiffPay = 0, nightDiffOtPay = 0, } = pay;
            return Object.assign(Object.assign({}, o), { hours: {
                    regularHrs: lodash_1.round(o.hours.regularHrs + regularHrs, 2),
                    overtimeHrs: lodash_1.round(o.hours.overtimeHrs + overtimeHrs, 2),
                    nightDiffHrs: lodash_1.round(o.hours.nightDiffHrs + nightDiffHrs, 2),
                    nightDiffOtHrs: lodash_1.round(o.hours.nightDiffOtHrs + nightDiffOtHrs, 2),
                }, pay: {
                    regularPay: lodash_1.round(o.pay.regularPay + regularPay, 2),
                    overtimePay: lodash_1.round(o.pay.overtimePay + overtimePay, 2),
                    nightDiffPay: lodash_1.round(o.pay.nightDiffPay + nightDiffPay, 2),
                    nightDiffOtPay: lodash_1.round(o.pay.nightDiffOtPay + nightDiffOtPay, 2),
                } });
        }, initial);
        const totalPayVal = lodash_1.sum(Object.values(totaled.pay));
        const totalPay = lodash_1.round(totalPayVal, 2);
        const deMinimisBenefits = this.calculateDeMinimis(deMinimis, payrollDetails.computeDeMinimis);
        let { contribution } = salaryDetails;
        if (!contribution) {
            contribution = new employee_contribution_entity_1.EmployeeContributionEntity();
            contribution.calcHDMF = true;
            contribution.calcSSS = true;
            contribution.calcPHIC = true;
        }
        const { calcHDMF = true, calcSSS = true, calcPHIC = true, eeHDMF, eePHIC, eeSSS, erHDMF, erPHIC, erSSS, } = contribution;
        const deductions = [];
        const contributions = {};
        const { basicSalary } = salaryDetails;
        const { computeHDMF = deduction_type_1.DeductionType.FULL, computePHIC = deduction_type_1.DeductionType.FULL, computeSSS = deduction_type_1.DeductionType.FULL, } = payrollDetails;
        const procDeduction = (ee, er, type) => ({
            employee: this.procDeduction(ee, type),
            employer: this.procDeduction(er, type),
            total: this.procDeduction(ee + er, type),
        });
        const calcDeduction = (key, canCalculate, ee, er, type) => {
            let deduction;
            if (canCalculate) {
                deduction = this.govRefService.calculateDeduction(key, basicSalary, type);
            }
            else {
                deduction = procDeduction(ee, er, type);
            }
            contributions[key] = deduction;
        };
        calcDeduction('SSS', calcSSS, eeSSS, erSSS, computeSSS);
        calcDeduction('HDMF', calcHDMF, eeHDMF, erHDMF, computeHDMF);
        calcDeduction('PHIC', calcPHIC, eePHIC, erPHIC, computePHIC);
        contributions.totals = {
            employer: lodash_1.round(eeHDMF + eePHIC + eeSSS, 2),
            employee: lodash_1.round(erHDMF + erPHIC + erSSS, 2),
            total: lodash_1.round(eeHDMF + eePHIC + eeSSS + erHDMF + erPHIC + erSSS, 2),
        };
        const totalDeductions = lodash_1.sum(deductions);
        const taxableIncome = totalPay - totalDeductions;
        const withholdingTax = this.govRefService.calculateWithholdingTax(taxableIncome, period);
        const netIncome = taxableIncome - withholdingTax;
        return {
            contributions,
            deMinimisBenefits,
            grossIncome: lodash_1.round(totalPay + deMinimisBenefits.total, 2),
            deductions: lodash_1.round(totalDeductions, 2),
            netIncome: lodash_1.round(netIncome, 2),
            totalContributions: lodash_1.round(contributions.totals.employee, 2),
            taxableIncome: lodash_1.round(taxableIncome, 2),
            withholdingTax: lodash_1.round(withholdingTax, 2),
        };
    }
    async calculatePerEmployee(employeeId, dateFrom, dateTo, payroll = {}) {
        const employee = await this.employeeService.get(employeeId);
        employee.company = await this.companyService.get(employee.companyId);
        const { salaryDetails } = employee;
        const { rateTable, deMinimis } = salaryDetails;
        const timelogs = await this.timelogService.consolidateTimelogs(employee, dateFrom, dateTo);
        const multipliers = this.consolidateMultipliers(rateTable.rates);
        const hoursRendered = this.consolidateTimelog(timelogs, employee, multipliers);
        const days = Object.values(timelogs).length;
        const period = days < 16 ? 2 : 1;
        const totals = this.calculateTotals(salaryDetails, hoursRendered, deMinimis, period, payroll);
        const { regDaily, regHourly, workDaysPerYear, workHrsPerDay, } = this.calculateRegularWages(employee);
        return {
            employee,
            timelogs,
            hoursRendered,
            totals,
            regDaily: lodash_1.round(regDaily, 2),
            regHourly: lodash_1.round(regHourly, 2),
            workDaysPerYear,
            workHrsPerDay,
        };
    }
    resolveMultiplier(multiplier) {
        const { regular, overtime, nightDiff, nightDiffOT } = multiplier;
        return {
            regular,
            overtime,
            nightDiff,
            nightDiffOT,
        };
    }
    consolidateTimelog(timelogs, employee, rateCollection) {
        const timelogEntries = Object.entries(timelogs);
        const consolidatedLogs = timelogEntries.reduce(this.timelogReducer, {});
        return Object.keys(consolidatedLogs).map((key) => {
            const hours = consolidatedLogs[key];
            const multipliers = this.resolveMultiplier(rateCollection[key]);
            const pay = this.calculatePay(hours, employee, multipliers);
            return {
                day: key,
                multipliers,
                hours,
                pay,
            };
        });
    }
    calculatePay(log, employee, multipliers) {
        const { regHourly } = this.calculateRegularWages(employee);
        const { regularHrs, overtimeHrs, nightDiffHrs, nightDiffOtHrs } = log;
        const { regular, overtime, nightDiff, nightDiffOT } = multipliers;
        const regularHourlyRate = regHourly * regular;
        const regularPay = lodash_1.round(regularHourlyRate * regularHrs, 2);
        const overtimeHourlyRate = regHourly * overtime;
        const overtimePay = lodash_1.round(overtimeHourlyRate * overtimeHrs, 2);
        const nightDiffRate = regHourly * nightDiff;
        const nightDiffPay = lodash_1.round(nightDiffRate * nightDiffHrs, 2);
        const nightDiffOTRate = regHourly * nightDiffOT;
        const nightDiffOtPay = lodash_1.round(nightDiffOTRate * nightDiffOtHrs, 2);
        return {
            regularPay,
            overtimePay,
            nightDiffPay,
            nightDiffOtPay,
        };
    }
    timelogReducer(currentTotal, currentTimelog) {
        const [, timelog] = currentTimelog;
        const add = (a = {}, b) => {
            const { regularHrs = 0, overtimeHrs = 0, nightDiffHrs = 0, nightDiffOtHrs = 0, } = a[b.multiplier] || {};
            return {
                [b.multiplier]: {
                    regularHrs: lodash_1.round(regularHrs + b.regularHrs, 2),
                    overtimeHrs: lodash_1.round(overtimeHrs + b.overtimeHrs, 2),
                    nightDiffHrs: lodash_1.round(nightDiffHrs + b.nightDiffHrs, 2),
                    nightDiffOtHrs: lodash_1.round(nightDiffOtHrs + b.nightDiffOtHrs, 2),
                },
            };
        };
        return Object.assign(Object.assign({}, currentTotal), add(currentTotal, timelog));
    }
    calculateDeMinimis(deMinimis, deductionType) {
        const totals = deMinimis.reduce((c, v) => {
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
        }, { list: [], total: 0 });
        return {
            list: totals.list,
            total: this.procDeduction(totals.total, deductionType),
        };
    }
    procDeduction(originalValue, deductionType) {
        switch (deductionType) {
            case deduction_type_1.DeductionType.HALF:
                return lodash_1.round(originalValue / 2, 2);
            case deduction_type_1.DeductionType.NO:
                return 0;
            case deduction_type_1.DeductionType.FULL:
            default:
                return lodash_1.round(originalValue, 2);
        }
    }
    calculateRegularWages(employee) {
        const { jobDetails, salaryDetails, company } = employee;
        const { shift } = jobDetails;
        const { workHrsPerDay } = shift;
        const paidWorkHours = workHrsPerDay - 1;
        const { isMinimumWageEarner, isDailyPaid, basicSalary, workDaysPerYear, } = salaryDetails;
        const { workPolicy } = company;
        const { workMonthsPerYear } = workPolicy;
        let regHourly = 0;
        let regDaily = 0;
        if (isMinimumWageEarner || isDailyPaid) {
            regDaily = basicSalary;
            regHourly = regDaily / paidWorkHours;
        }
        else {
            regDaily = (basicSalary * workMonthsPerYear) / workDaysPerYear;
            regHourly = regDaily / paidWorkHours;
        }
        return {
            regHourly: lodash_1.round(regHourly, 2),
            regDaily: lodash_1.round(regDaily, 2),
            workDaysPerYear: lodash_1.round(workDaysPerYear, 2),
            workHrsPerDay: lodash_1.round(workHrsPerDay, 2),
        };
    }
    consolidateMultipliers(rates) {
        return rates.reduce((c, rate) => (Object.assign(Object.assign({}, c), { [rate.name]: rate })), {});
    }
};
PayrollComputationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [timelog_service_1.TimelogService,
        government_references_service_1.GovernmentReferenceService,
        company_service_1.CompanyService,
        employee_service_1.EmployeeService])
], PayrollComputationService);
exports.PayrollComputationService = PayrollComputationService;
//# sourceMappingURL=payroll-computation.service.js.map