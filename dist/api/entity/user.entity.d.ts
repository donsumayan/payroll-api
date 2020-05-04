import { BaseEntity } from './base.entity';
import { CompanyEntity } from './company/company.entity';
import { RoleEntity } from './role.entity';
export declare class UserEntity extends BaseEntity {
    username: string;
    password: string;
    salt: string;
    roles: RoleEntity[];
    employee: CompanyEntity;
    employeeId: string;
    companyId: string;
    firstLogin: boolean;
}
