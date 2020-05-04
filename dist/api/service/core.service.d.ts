import { DeepPartial, FindManyOptions } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { PaginatedResponseDTO } from '../dto/paginated-response.dto';
import { BaseEntity } from '../entity/base.entity';
import { UserEntity } from '../entity/user.entity';
import { BaseService } from './base.service';
export declare class CoreService<E = BaseEntity> implements BaseService<E> {
    readonly repository: Repository<E>;
    constructor(repository: Repository<E>);
    getAll(criteria: FindManyOptions<E>): Promise<PaginatedResponseDTO<E>>;
    get(id: string, query?: any): Promise<E>;
    getList(): Promise<E[]>;
    create(partialEntity: DeepPartial<E>): Promise<E>;
    update(partialEntity: any): Promise<E>;
    delete(idList: string, user: UserEntity): Promise<E[]>;
    import(partialEntities: DeepPartial<E>[]): Promise<E[]>;
}
