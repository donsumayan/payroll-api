import { Repository } from 'typeorm';
import { PayGroupEntity } from '../entity/pay-group.entity';
import { CoreService } from './core.service';
export declare class PayGroupService extends CoreService<PayGroupEntity> {
    readonly repository: Repository<PayGroupEntity>;
    constructor(repository: Repository<PayGroupEntity>);
}
