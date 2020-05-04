/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeepPartial, FindManyOptions } from 'typeorm';

import { PaginatedResponseDTO } from '../dto/paginated-response.dto';
import { BaseEntity } from '../entity/base.entity';
import { UserEntity } from '../entity/user.entity';

export interface BaseService<E = BaseEntity> {
  getAll(criteria: FindManyOptions): Promise<PaginatedResponseDTO<E>>;

  get(id: string, query: any): Promise<E>;

  getList(): Promise<E[]>;

  create(dto: DeepPartial<E>): Promise<E>;

  update(dto: DeepPartial<E>): Promise<E>;

  delete(idList: string, user: UserEntity): Promise<E[]>;

  import(entities: DeepPartial<E>[]): Promise<E[]>;
}
