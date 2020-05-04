import { Response } from 'express';
import { ResponseDTO } from '../dto/response.dto';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(req: any): Promise<ResponseDTO<{
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
        token: any;
    }>>;
    getProfile(req: any): Promise<ResponseDTO<import("../entity/user.entity").UserEntity>>;
    logout(res: Response): Promise<void>;
}
