import { Injectable } from '@nestjs/common';
import { round, sumBy } from 'lodash';

import { DeductionType } from '../constant/deduction-type';
import { HDMF_CONTRIBUTION_TABLE } from '../constant/hdmf-contribution-tables';
import { PHILHEALTH_CONTRIBUTION_TABLE } from '../constant/philhealth-contribution-table';
import { SSS_CONTRIBUTION_TABLE } from '../constant/sss-contribution-table';
import {
  DAILY,
  MONTHLY,
  SEMI_MONTHLY,
  YEARLY,
} from '../constant/withholding-tax-tables';
import { PayrollRunsEntity } from '../entity/payroll-runs.entity';

export interface DeductionShare {
  employee: number;
  employer: number;
  total: number;
  message?: string;
}

@Injectable()
export class GovernmentReferenceService {
  getTaxTable() {
    return {
      DAILY,
      MONTHLY,
      SEMI_MONTHLY,
      YEARLY,
    };
  }

  getPHICTable() {
    return PHILHEALTH_CONTRIBUTION_TABLE;
  }

  getSSSTable() {
    return SSS_CONTRIBUTION_TABLE;
  }

  getHdmfContributionTable() {
    return HDMF_CONTRIBUTION_TABLE;
  }

  calculateWithholdingTax(basicSalary: number, period: 0 | 1 | 2) {
    const TABLE = {
      0: DAILY,
      1: MONTHLY,
      2: SEMI_MONTHLY,
    };

    const salaryBracket = TABLE[period].find(
      ({ upperLimit }) => basicSalary < upperLimit || upperLimit === 'Infinity'
    );

    const tax =
      (basicSalary - salaryBracket.lowerLimit) *
      (salaryBracket.adjustmentRate / 100);

    return tax;
  }

  calculateDeduction(
    key: 'HDMF' | 'PHIC' | 'SSS',
    basicSalary: number,
    type: DeductionType
  ) {
    switch (key) {
      case 'HDMF':
        return this.calculateHDMF(basicSalary, type);
      case 'PHIC':
        return this.calculatePHIC(basicSalary, type);
      case 'SSS':
        return this.calculateSSS(basicSalary, type);
    }
  }

  calculateHDMF(basicSalary: number, type: DeductionType): DeductionShare {
    // sources::
    // https://filipiknow.net/pag-ibig-contribution-table/

    const contribution: DeductionShare = {
      employee: 0,
      employer: 0,
      total: 0,
    };

    if (basicSalary > 5000) {
      contribution.employee = this.procDeduction(100, type);
      contribution.employer = this.procDeduction(100, type);
      contribution.total = this.procDeduction(
        contribution.employer + contribution.employee,
        type
      );

      return contribution;
    } else if (basicSalary > 1500) {
      contribution.employee = this.procDeduction(basicSalary * 0.02, type);
      contribution.employer = this.procDeduction(basicSalary * 0.02, type);
      contribution.total = this.procDeduction(
        contribution.employer + contribution.employee,
        type
      );
      return contribution;
    } else if (basicSalary > 1000) {
      contribution.employee = this.procDeduction(basicSalary * 0.01, type);
      contribution.employer = this.procDeduction(basicSalary * 0.02, type);
      contribution.total = this.procDeduction(
        contribution.employer + contribution.employee,
        type
      );
      return contribution;
    }

    return {
      employee: round(contribution.employee, 2),
      employer: round(contribution.employer, 2),
      total: round(contribution.total, 2),
      message: 'Could not calculate, basic salary is out of calculable bounds.',
    };
  }

  procDeduction(originalValue: number, deductionType: DeductionType) {
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

  calculatePHIC(basicSalary: number, type: DeductionType): DeductionShare {
    // sources::
    // https://filipiknow.net/philhealth-contribution/
    const bracket = PHILHEALTH_CONTRIBUTION_TABLE.find(
      ({ upperLimit }) => basicSalary < upperLimit || upperLimit === 'Infinity'
    );
    const rate = bracket.rate / 100;
    const contribution = basicSalary * rate + bracket.fixedContribution;

    const eeer = round(contribution / 2);

    return {
      employee: this.procDeduction(eeer, type),
      employer: this.procDeduction(eeer, type),
      total: this.procDeduction(contribution, type),
    };
  }

  calculateSSS(basicSalary: number, type: DeductionType): DeductionShare {
    // sources::
    // https://filipiknow.net/sss-contribution/

    const { totalEe, totalEr, total } = SSS_CONTRIBUTION_TABLE.find(
      ({ upperLimit }) => basicSalary < upperLimit || upperLimit === 'Infinity'
    );

    return {
      employee: this.procDeduction(round(totalEe, 2), type),
      employer: this.procDeduction(round(totalEr, 2), type),
      total: this.procDeduction(total, type),
    };
  }

  calculateContributions(
    basicSalary: number,
    payrollDetails: Partial<PayrollRunsEntity> = {}
  ) {
    const {
      computeHDMF = DeductionType.FULL,
      computePHIC = DeductionType.FULL,
      computeSSS = DeductionType.FULL,
    } = payrollDetails;

    const HDMF = this.calculateHDMF(basicSalary, computeHDMF);
    const PHIC = this.calculatePHIC(basicSalary, computePHIC);
    const SSS = this.calculateSSS(basicSalary, computeSSS);

    const contributions = [HDMF, PHIC, SSS];
    const totals: DeductionShare = {
      employee: round(sumBy(contributions, 'employee'), 2),
      employer: round(sumBy(contributions, 'employer'), 2),
      total: round(sumBy(contributions, 'total'), 2),
    };

    return { HDMF, PHIC, SSS, totals };
  }
}
