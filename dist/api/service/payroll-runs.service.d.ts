import { Repository } from 'typeorm';
import { PayrollRunsEntity } from '../entity/payroll-runs.entity';
import { CoreService } from './core.service';
import { PayrollComputationService } from './payroll-computation.service';
export declare class PayrollRunsService extends CoreService<PayrollRunsEntity> {
    readonly repository: Repository<PayrollRunsEntity>;
    readonly computationService: PayrollComputationService;
    constructor(repository: Repository<PayrollRunsEntity>, computationService: PayrollComputationService);
    get(id: string): Promise<any>;
}
