import { Repository } from 'typeorm';
import { RateTableEntity } from '../entity/rate-table.entity';
import { CoreService } from './core.service';
export declare class RateTableService extends CoreService<RateTableEntity> {
    readonly rateTablesRepository: Repository<RateTableEntity>;
    constructor(rateTablesRepository: Repository<RateTableEntity>);
}
