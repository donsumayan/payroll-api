import { Repository } from 'typeorm';
import { EmploymentStatusEntity } from '../entity/employee/employment-status.entity';
import { CoreService } from './core.service';
export declare class EmploymentStatusService extends CoreService<EmploymentStatusEntity> {
    readonly repo: Repository<EmploymentStatusEntity>;
    constructor(repo: Repository<EmploymentStatusEntity>);
}
