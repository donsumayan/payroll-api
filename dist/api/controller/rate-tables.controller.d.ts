import { ResponseDTO } from '../dto/response.dto';
import { RateTableEntity } from '../entity/rate-table.entity';
import { RateTableService } from '../service/rate-tables.service';
import { BaseController } from './base.controller';
export declare class RateTablesController extends BaseController<RateTableEntity> {
    readonly rateTablesService: RateTableService;
    constructor(rateTablesService: RateTableService);
    getTypes(): ResponseDTO<{
        name: string;
        id: string;
    }[]>;
}
