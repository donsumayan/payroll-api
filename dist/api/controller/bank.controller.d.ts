import { BankEntity } from '../entity/bank.entity';
import { BankService } from '../service/bank.service';
import { BaseController } from './base.controller';
export declare class BankController extends BaseController<BankEntity> {
    readonly bankService: BankService;
    constructor(bankService: BankService);
}
