import { PayGroupEntity } from '../entity/pay-group.entity';
import { PayGroupService } from '../service/pay-group.service';
import { BaseController } from './base.controller';
export declare class PayGroupController extends BaseController<PayGroupEntity> {
    readonly service: PayGroupService;
    constructor(service: PayGroupService);
}
