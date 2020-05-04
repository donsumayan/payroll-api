import { BaseEntity } from '../base.entity';
import { EmployeeEntity } from './employee.entity';
export declare class ContactEntity extends BaseEntity {
    contactNumber: string;
    homeAddress: string;
    zipCode: string;
    emailAddress: string;
    employee: EmployeeEntity;
}
