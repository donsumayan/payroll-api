import { Repository } from 'typeorm';
import { RoleEntity } from '../entity/role.entity';
import { CoreService } from './core.service';
export declare class RoleService extends CoreService<RoleEntity> {
    readonly roleRepository: Repository<RoleEntity>;
    constructor(roleRepository: Repository<RoleEntity>);
}
