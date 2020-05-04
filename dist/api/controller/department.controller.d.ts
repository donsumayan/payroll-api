import { DepartmentEntity } from '../entity/department.entity';
import { DepartmentService } from '../service/department.service';
import { BaseController } from './base.controller';
export declare class DepartmentController extends BaseController<DepartmentEntity> {
    readonly departmentService: DepartmentService;
    constructor(departmentService: DepartmentService);
}
