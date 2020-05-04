import { Repository } from 'typeorm';
import { BankEntity } from '../entity/bank.entity';
import { CoreService } from './core.service';
export declare class BankService extends CoreService<BankEntity> {
    readonly repository: Repository<BankEntity>;
    constructor(repository: Repository<BankEntity>);
}
