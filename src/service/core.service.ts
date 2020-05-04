/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core';
import { validate } from 'class-validator';
import { merge } from 'lodash';
import { DeepPartial, FindManyOptions, FindOneOptions, In } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { PaginatedResponseDTO } from '../dto/paginated-response.dto';
import { BaseEntity } from '../entity/base.entity';
import { UserEntity } from '../entity/user.entity';
import { BaseService } from './base.service';

@Injectable()
export class CoreService<E = BaseEntity> implements BaseService<E> {
  constructor(readonly repository: Repository<E>) {}

  async getAll(criteria: FindManyOptions<E>): Promise<PaginatedResponseDTO<E>> {
    try {
      const [pageItems, totalItems] = await this.repository.findAndCount(
        criteria
      );
      const { skip, take } = criteria;
      const response = {
        pageItems,
        totalItems,
        pageNo: (skip || 0) + 1,
        pageSize: +(take || 10),
      };
      return new PaginatedResponseDTO(response);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async get(id: string, query?: any): Promise<E> {
    try {
      const options: FindOneOptions = { where: { id, isDeleted: 0 } };
      if (query) {
        const { relations } = query;
        if (relations) {
          options.relations = (relations as string).split(',');
        }
      }

      return this.repository.findOne(options);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getList(): Promise<E[]> {
    try {
      return this.repository.find({ where: { isDeleted: 0 } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(partialEntity: DeepPartial<E>): Promise<E> {
    try {
      const entity = this.repository.create(partialEntity);
      const errors = await validate(entity);

      if (errors.length > 0) {
        throw new BadRequestException('Validation failed', errors.toString());
      }

      const savedEntity = await this.repository.save(entity);

      return savedEntity;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(partialEntity: any): Promise<E> {
    try {
      const { id } = partialEntity;
      const savedEntity = await this.get(id);
      const deepCopiedEntity = merge(savedEntity, partialEntity);
      const entity = this.repository.create(deepCopiedEntity);

      const errors = await validate(entity);

      if (errors.length > 0) {
        throw new BadRequestException('Validation failed', errors.toString());
      }
      return this.repository.save(deepCopiedEntity);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(idList: string, user: UserEntity): Promise<E[]> {
    try {
      const updateBy = user.id;
      const isDeleted = true;

      return this.repository.manager.transaction(async manager => {
        const list = idList.split(',');

        const where = { id: In(list) };

        await manager
          .createQueryBuilder()
          .update(this.repository.target)
          .set({ updateBy, isDeleted } as any)
          .where(where)
          .execute();

        return this.repository.find({ where });
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async import(partialEntities: DeepPartial<E>[]): Promise<E[]> {
    try {
      const entities = partialEntities.map(entity =>
        this.repository.create(entity)
      );
      return await this.repository.save(entities);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
