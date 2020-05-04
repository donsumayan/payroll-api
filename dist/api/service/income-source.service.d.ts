import { Repository } from 'typeorm';
import { IncomeSourceEntity } from '../entity/company/income-source.entity';
import { CoreService } from './core.service';
export declare class IncomeSourceService extends CoreService<IncomeSourceEntity> {
    readonly incomeSoruceRepository: Repository<IncomeSourceEntity>;
    constructor(incomeSoruceRepository: Repository<IncomeSourceEntity>);
}
