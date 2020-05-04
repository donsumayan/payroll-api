import { Repository } from 'typeorm';
import { DepartmentEntity } from '../entity/department.entity';
import { CoreService } from './core.service';
export declare class DepartmentService extends CoreService<DepartmentEntity> {
    readonly departmentEntityRepository: Repository<DepartmentEntity>;
    constructor(departmentEntityRepository: Repository<DepartmentEntity>);
}
