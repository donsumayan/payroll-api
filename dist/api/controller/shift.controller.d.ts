import { ShiftEntity } from '../entity/shift.entity';
import { ShiftService } from '../service/shift.service';
import { BaseController } from './base.controller';
export declare class ShiftController extends BaseController<ShiftEntity> {
    readonly service: ShiftService;
    constructor(service: ShiftService);
}
