import { Repository } from 'typeorm';
import { ShiftEntity } from '../entity/shift.entity';
import { CoreService } from './core.service';
export declare class ShiftService extends CoreService<ShiftEntity> {
    readonly ShiftRepository: Repository<ShiftEntity>;
    constructor(ShiftRepository: Repository<ShiftEntity>);
}
