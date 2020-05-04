import { BaseEntity } from '../base.entity';
import { SiteEntity } from '../site.entity';
import { EmployeeEntity } from './employee.entity';
export declare class EmployeeSiteEntity extends BaseEntity {
    employee: EmployeeEntity | string;
    site: SiteEntity | string;
}
