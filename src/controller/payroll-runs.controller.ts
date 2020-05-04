import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ACCESS } from '../constant/api-features';
import { Feature } from '../decorators/action.decorators';
import { PayrollRunsEntity } from '../entity/payroll-runs.entity';
import { PayrollRunsService } from '../service/payroll-runs.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Feature(ACCESS.PAYROLL)
@Controller('payroll-runs')
export class PayrollRunsController extends BaseController<PayrollRunsEntity> {
  constructor(readonly service: PayrollRunsService) {
    super(service);
  }
}
