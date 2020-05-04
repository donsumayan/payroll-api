import { BaseEntity } from '../base.entity';
import { SiteEntity } from '../site.entity';
import { EmployeeEntity } from './employee.entity';
export declare class TimelogEntity extends BaseEntity {
    serverTime: Date;
    time: string;
    date: string;
    type: string;
    remarks: string;
    employee: EmployeeEntity;
    site: SiteEntity;
}
