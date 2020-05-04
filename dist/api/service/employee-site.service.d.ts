import { Repository } from 'typeorm';
import { EmployeeSiteEntity } from '../entity/employee/employee-site.entity';
import { CoreService } from './core.service';
export declare class EmployeeSiteService extends CoreService<EmployeeSiteEntity> {
    readonly employeeSiteRepository: Repository<EmployeeSiteEntity>;
    constructor(employeeSiteRepository: Repository<EmployeeSiteEntity>);
    getByEmployeeAndSite(employee: any, site: any): Promise<EmployeeSiteEntity>;
    getEmployeesBySite(site: any): Promise<EmployeeSiteEntity[]>;
}
