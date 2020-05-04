import { PayrollRunsEntity } from '../entity/payroll-runs.entity';
import { PayrollRunsService } from '../service/payroll-runs.service';
import { BaseController } from './base.controller';
export declare class PayrollRunsController extends BaseController<PayrollRunsEntity> {
    readonly service: PayrollRunsService;
    constructor(service: PayrollRunsService);
}
