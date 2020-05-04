import { DeepPartial } from 'typeorm';
import { PaginatedResponseDTO } from '../dto/paginated-response.dto';
import { ResponseDTO } from '../dto/response.dto';
import { UserEntity } from '../entity/user.entity';
import { CoreService } from '../service/core.service';
export declare class BaseController<E> {
    private readonly baseService;
    constructor(baseService: CoreService<E>);
    findAll(request: any): Promise<ResponseDTO<PaginatedResponseDTO<E>>>;
    findById(id: string, req: any): Promise<ResponseDTO<E>>;
    create(request: any, entity: E): Promise<ResponseDTO<E>>;
    update(request: any, id: string, entity: DeepPartial<E>): Promise<ResponseDTO<E>>;
    deleteMultiple(user: UserEntity, idlist: string): Promise<ResponseDTO<E[]>>;
    import(request: any, entities: E[]): Promise<ResponseDTO<E[]>>;
    preCheckRequest(request: any): any;
}
