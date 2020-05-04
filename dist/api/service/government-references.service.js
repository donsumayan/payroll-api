"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const deduction_type_1 = require("../constant/deduction-type");
const hdmf_contribution_tables_1 = require("../constant/hdmf-contribution-tables");
const philhealth_contribution_table_1 = require("../constant/philhealth-contribution-table");
const sss_contribution_table_1 = require("../constant/sss-contribution-table");
const withholding_tax_tables_1 = require("../constant/withholding-tax-tables");
let GovernmentReferenceService = class GovernmentReferenceService {
    getTaxTable() {
        return {
            DAILY: withholding_tax_tables_1.DAILY,
            MONTHLY: withholding_tax_tables_1.MONTHLY,
            SEMI_MONTHLY: withholding_tax_tables_1.SEMI_MONTHLY,
            YEARLY: withholding_tax_tables_1.YEARLY,
        };
    }
    getPHICTable() {
        return philhealth_contribution_table_1.PHILHEALTH_CONTRIBUTION_TABLE;
    }
    getSSSTable() {
        return sss_contribution_table_1.SSS_CONTRIBUTION_TABLE;
    }
    getHdmfContributionTable() {
        return hdmf_contribution_tables_1.HDMF_CONTRIBUTION_TABLE;
    }
    calculateWithholdingTax(basicSalary, period) {
        const TABLE = {
            0: withholding_tax_tables_1.DAILY,
            1: withholding_tax_tables_1.MONTHLY,
            2: withholding_tax_tables_1.SEMI_MONTHLY,
        };
        const salaryBracket = TABLE[period].find(({ upperLimit }) => basicSalary < upperLimit || upperLimit === 'Infinity');
        const tax = (basicSalary - salaryBracket.lowerLimit) *
            (salaryBracket.adjustmentRate / 100);
        return tax;
    }
    calculateDeduction(key, basicSalary, type) {
        switch (key) {
            case 'HDMF':
                return this.calculateHDMF(basicSalary, type);
            case 'PHIC':
                return this.calculatePHIC(basicSalary, type);
            case 'SSS':
                return this.calculateSSS(basicSalary, type);
        }
    }
    calculateHDMF(basicSalary, type) {
        const contribution = {
            employee: 0,
            employer: 0,
            total: 0,
        };
        if (basicSalary > 5000) {
            contribution.employee = this.procDeduction(100, type);
            contribution.employer = this.procDeduction(100, type);
            contribution.total = this.procDeduction(contribution.employer + contribution.employee, type);
            return contribution;
        }
        else if (basicSalary > 1500) {
            contribution.employee = this.procDeduction(basicSalary * 0.02, type);
            contribution.employer = this.procDeduction(basicSalary * 0.02, type);
            contribution.total = this.procDeduction(contribution.employer + contribution.employee, type);
            return contribution;
        }
        else if (basicSalary > 1000) {
            contribution.employee = this.procDeduction(basicSalary * 0.01, type);
            contribution.employer = this.procDeduction(basicSalary * 0.02, type);
            contribution.total = this.procDeduction(contribution.employer + contribution.employee, type);
            return contribution;
        }
        return {
            employee: lodash_1.round(contribution.employee, 2),
            employer: lodash_1.round(contribution.employer, 2),
            total: lodash_1.round(contribution.total, 2),
            message: 'Could not calculate, basic salary is out of calculable bounds.',
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
    calculatePHIC(basicSalary, type) {
        const bracket = philhealth_contribution_table_1.PHILHEALTH_CONTRIBUTION_TABLE.find(({ upperLimit }) => basicSalary < upperLimit || upperLimit === 'Infinity');
        const rate = bracket.rate / 100;
        const contribution = basicSalary * rate + bracket.fixedContribution;
        const eeer = lodash_1.round(contribution / 2);
        return {
            employee: this.procDeduction(eeer, type),
            employer: this.procDeduction(eeer, type),
            total: this.procDeduction(contribution, type),
        };
    }
    calculateSSS(basicSalary, type) {
        const { totalEe, totalEr, total } = sss_contribution_table_1.SSS_CONTRIBUTION_TABLE.find(({ upperLimit }) => basicSalary < upperLimit || upperLimit === 'Infinity');
        return {
            employee: this.procDeduction(lodash_1.round(totalEe, 2), type),
            employer: this.procDeduction(lodash_1.round(totalEr, 2), type),
            total: this.procDeduction(total, type),
        };
    }
    calculateContributions(basicSalary, payrollDetails = {}) {
        const { computeHDMF = deduction_type_1.DeductionType.FULL, computePHIC = deduction_type_1.DeductionType.FULL, computeSSS = deduction_type_1.DeductionType.FULL, } = payrollDetails;
        const HDMF = this.calculateHDMF(basicSalary, computeHDMF);
        const PHIC = this.calculatePHIC(basicSalary, computePHIC);
        const SSS = this.calculateSSS(basicSalary, computeSSS);
        const contributions = [HDMF, PHIC, SSS];
        const totals = {
            employee: lodash_1.round(lodash_1.sumBy(contributions, 'employee'), 2),
            employer: lodash_1.round(lodash_1.sumBy(contributions, 'employer'), 2),
            total: lodash_1.round(lodash_1.sumBy(contributions, 'total'), 2),
        };
        return { HDMF, PHIC, SSS, totals };
    }
};
GovernmentReferenceService = __decorate([
    common_1.Injectable()
], GovernmentReferenceService);
exports.GovernmentReferenceService = GovernmentReferenceService;
//# sourceMappingURL=government-references.service.js.map