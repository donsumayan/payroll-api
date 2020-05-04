import { FindManyOptions, Repository } from 'typeorm';
import { PaginatedResponseDTO } from '../dto/paginated-response.dto';
import { EmployeeEntity } from '../entity/employee/employee.entity';
import { UserEntity } from '../entity/user.entity';
import { CoreService } from './core.service';
export declare class UserService extends CoreService<UserEntity> {
    readonly userRepository: Repository<UserEntity>;
    constructor(userRepository: Repository<UserEntity>);
    get(id: string): Promise<UserEntity>;
    getAll(criteria: FindManyOptions<UserEntity>): Promise<PaginatedResponseDTO<UserEntity>>;
    getByUsernameAndPassword(username: string, pass: string): Promise<Partial<UserEntity>>;
    createUserFromEmployee(employee: EmployeeEntity, username: string): Promise<UserEntity>;
    findOne(username: string, pass: string): Promise<Partial<UserEntity>>;
    createUser(user: UserEntity): Promise<UserEntity>;
    create(partialEntity: UserEntity): Promise<UserEntity>;
    updatePassword(body: Partial<UserEntity>): Promise<Partial<UserEntity>>;
}
