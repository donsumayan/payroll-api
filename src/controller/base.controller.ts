/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  Body,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';

import { ActionType } from '../constant/action-type';
import { Action } from '../decorators/action.decorators';
import { User } from '../decorators/user.decorator';
import { PaginatedResponseDTO } from '../dto/paginated-response.dto';
import { ResponseDTO } from '../dto/response.dto';
import { UserEntity } from '../entity/user.entity';
import { CoreService } from '../service/core.service';
import { FieldMapper } from '../utils/field-mapper';
import { SearchCriteriaUtil } from '../utils/search-criteria-util';

export class BaseController<E> {
  /**
   * @apiDefine AuthHeader
   * @apiHeader {string} Authorization JWT token
   * @apiHeaderExample {json} Header-Example
   * {
   *    'Authorization': 'Bearer <string>'
   * }
   *
   */

  /**
   * @apiDefine ResponseDto
   * @apiSuccess {string} message Success Message.
   * @apiSuccess {number} status Sucess Status code.
   * @apiSuccess {json} content Response Object.
   */

  /**
   * @apiDefine PagingParams
   *
   * @apiParam {Number=1,2,3, ... n} [pageNo=0] Page Number of page.
   * @apiParam {Number=1,2,3, ... n} [pageSize=25] Page Size of page.
   * @apiParam {String={fieldName}|{fieldValue},{fieldName}|{fieldValue},...} [filter] Search Filter.
   * @apiParam {String={fieldName}} [orderBy] Order By Column.
   * @apiParam {String='ASC'|'DESC'} [sort='DESC'] Sort Order Column.
   */

  /**
   * @apiDefine UserIdNotFoundError
   * @apiErrorExample {json} Error Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "status": 400,
   *       "error": "Bad Request",
   *       "message": "User not found"
   *     }
   */

  constructor(private readonly baseService: CoreService<E>) {}

  @Get('/list')
  async findAll(
    @Request() request
  ): Promise<ResponseDTO<PaginatedResponseDTO<E>>> {
    const criteria = SearchCriteriaUtil.createCriteria(request.query);
    const paginatedList = await this.baseService.getAll(criteria);
    return new ResponseDTO('Retrieved...', paginatedList, HttpStatus.OK);
  }

  @Get(':id')
  @Action(ActionType.READ)
  async findById(
    @Param('id') id: string,
    @Request() req: any
  ): Promise<ResponseDTO<E>> {
    const entity = await this.baseService.get(id, req.query);
    return new ResponseDTO<E>('Retrieved...', entity, HttpStatus.OK);
  }

  @Post()
  @Action(ActionType.CREATE)
  async create(@Req() request, @Body() entity: E) {
    const createBy = this.preCheckRequest(request);
    const data = FieldMapper.populateUserToFields(entity, { createBy });
    const savedEntity = await this.baseService.create(data);

    return new ResponseDTO(
      'Saved Succesfully',
      savedEntity,
      HttpStatus.CREATED
    );
  }

  @Put(':id')
  @Action(ActionType.UPDATE)
  async update(
    @Req() request,
    @Param('id') id: string,
    @Body() entity: DeepPartial<E>
  ) {
    const updateBy = this.preCheckRequest(request);
    const data = FieldMapper.populateUserToFields(entity, {
      updateBy,
    });
    data['id'] = id;
    const updatedEntity = await this.baseService.update(data);
    return new ResponseDTO('Updated Succesfully', updatedEntity, HttpStatus.OK);
  }

  @Delete()
  @Action(ActionType.DELETE)
  async deleteMultiple(@User() user: UserEntity, @Query('id') idlist: string) {
    const deletedEntities = await this.baseService.delete(idlist, user);

    return new ResponseDTO(
      'Deleted Succesfully',
      deletedEntities,
      HttpStatus.OK
    );
  }

  @Post('/import')
  @Action(ActionType.CREATE)
  async import(@Req() request, @Body() entities: E[]) {
    const createBy = this.preCheckRequest(request);
    const data = entities.map(entity =>
      FieldMapper.populateUserToFields(entity, { createBy })
    );
    const savedEntities = await this.baseService.import(data);
    return new ResponseDTO(
      'Saved Succesfully',
      savedEntities,
      HttpStatus.CREATED
    );
  }

  preCheckRequest(request) {
    const userId = request.user.id;
    if (!userId) {
      throw new BadRequestException('User not found in header');
    }
    return userId;
  }
}
