import { ResponseDTO } from '../dto/response.dto';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { BaseController } from './base.controller';
export declare class UserController extends BaseController<UserEntity> {
    readonly service: UserService;
    constructor(service: UserService);
    create(body: UserEntity, user: UserEntity): Promise<ResponseDTO<UserEntity>>;
    validateEmployeeId(username: string): Promise<ResponseDTO<{
        valid: boolean;
    }>>;
    updatePassword(body: UserEntity): Promise<ResponseDTO<Partial<UserEntity>>>;
}
