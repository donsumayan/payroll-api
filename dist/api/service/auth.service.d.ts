import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entity/user.entity';
import { UserService } from './user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<Partial<UserEntity>>;
    login(user: UserEntity): Promise<{
        username: string;
        password: string;
        salt: string;
        roles: import("../entity/role.entity").RoleEntity[];
        employee: import("../entity/company/company.entity").CompanyEntity;
        employeeId: string;
        companyId: string;
        firstLogin: boolean;
        id: string;
        createBy: string;
        draftId: string;
        createTime: Date;
        updateBy: string;
        updateTime: Date;
        isDeleted: boolean;
        token: string;
    }>;
}
