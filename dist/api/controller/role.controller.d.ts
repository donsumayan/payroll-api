import { ResponseDTO } from '../dto/response.dto';
import { RoleEntity } from '../entity/role.entity';
import { RoleService } from '../service/role.service';
import { BaseController } from './base.controller';
export declare class RoleController extends BaseController<RoleEntity> {
    readonly roleService: RoleService;
    constructor(roleService: RoleService);
    accessTypes(): Promise<ResponseDTO<any[]>>;
}
