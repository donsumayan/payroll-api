import { EmploymentStatusEntity } from '../entity/employee/employment-status.entity';
import { EmploymentStatusService } from '../service/employment-status.service';
import { BaseController } from './base.controller';
export declare class EmploymentStatusController extends BaseController<EmploymentStatusEntity> {
    readonly service: EmploymentStatusService;
    constructor(service: EmploymentStatusService);
}
