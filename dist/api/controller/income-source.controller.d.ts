import { IncomeSourceEntity } from '../entity/company/income-source.entity';
import { IncomeSourceService } from '../service/income-source.service';
import { BaseController } from './base.controller';
export declare class IncomeSourceController extends BaseController<IncomeSourceEntity> {
    readonly incomeSourceService: IncomeSourceService;
    constructor(incomeSourceService: IncomeSourceService);
}
