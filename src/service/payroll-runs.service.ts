import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PayrollRunsEntity } from '../entity/payroll-runs.entity';
import { CoreService } from './core.service';
import { PayrollComputationService } from './payroll-computation.service';
import moment = require('moment');
import { QUERY_DATE_FORMAT } from '../constant/constants';

@Injectable()
export class PayrollRunsService extends CoreService<PayrollRunsEntity> {
  constructor(
    @InjectRepository(PayrollRunsEntity)
    readonly repository: Repository<PayrollRunsEntity>,

    readonly computationService: PayrollComputationService
  ) {
    super(repository);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get(id: string): Promise<any> {
    const payroll = await super.get(id);
    const dateFrom = moment(payroll.dateFrom, 'L').format(QUERY_DATE_FORMAT);
    const dateTo = moment(payroll.dateTo, 'L').format(QUERY_DATE_FORMAT);

    const payDetails = await Promise.all(
      payroll.employees.map(async employee => {
        const pay = await this.computationService.calculatePerEmployee(
          employee.id,
          dateFrom,
          dateTo,
          payroll
        );
        return pay;
      })
    );

    return { ...payroll, details: payDetails };
  }
}
