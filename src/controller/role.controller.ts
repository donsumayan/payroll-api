import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ActionType } from '../constant/action-type';
import { ACCESS } from '../constant/api-features';
import { Feature } from '../decorators/action.decorators';
import { ResponseDTO } from '../dto/response.dto';
import { RoleEntity } from '../entity/role.entity';
import { RoleService } from '../service/role.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Feature(ACCESS.ROLES)
@Controller('role')
export class RoleController extends BaseController<RoleEntity> {
  constructor(readonly roleService: RoleService) {
    super(roleService);
  }
  /**
   * @api {get} role/action-types Get action types
   * @apiVersion 1.0.0
   * @apiGroup Role
   *
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   *
   * @apiSuccess {enum} content Action Types.
   *
   */
  @Get('access-types')
  async accessTypes() {
    return new ResponseDTO(
      'Sucess',
      Object.values(ACCESS).reduce(
        (arr, feature) => [
          ...arr,
          ...Object.values(ActionType).map(action => {
            const name = `${feature} - ${action}`;
            const id = `${feature}::${action}`;
            return { name, id };
          }),
        ],
        []
      ),
      200
    );
  }

  /**
   * @api {get} role/:id Get By Id
   * @apiVersion 1.0.0
   * @apiGroup Roles
   *
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   *
   * @apiSuccess {Role} content Role Details.
   *
   */

  /**
   * @api {get} role/list Get list
   * @apiVersion 1.0.0
   * @apiGroup Roles
   *
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   * @apiUse PagingParams
   *
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Retrieved",
   *       "status": 200,
   *       "content": {
   *          "pageNo": number,
   *          "pageSize": number,
   *          "pageItems": [],
   *          "totalItems": number
   *       }
   *     }
   */

  /**
   * @api {post} role/ Create
   * @apiVersion 1.0.0
   * @apiGroup Roles
   *
   * @apiUse AuthHeader
   * @apiUse UserIdNotFoundError
   * @apiUse ResponseDto
   *
   * @apiParamExample {json} Request Body:
   * {
   *  "roleName": "Role 1",
   *  "description": "Role Description",
   *  "access": [
   *    {
   *      "feature": "paygroup",
   *      "accessType": "create"
   *    }
   *  ]
   * }
   *
   * @apiSuccess {json} content Role Details.
   */

  /**
   * @api {put} role/:id Update
   * @apiVersion 1.0.0
   * @apiGroup Roles
   *
   * @apiUse UserIdNotFoundError
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   *
   * @apiParam {number} id Id of bank to be updated
   * @apiParamExample {RoleModel} Request Body:
   * {
   *  "roleName": "Role 1",
   *  "description": "Role Description",
   *  "access": [
   *    {
   *      "feature": "paygroup",
   *      "accessType": "create"
   *    }
   *  ]
   * }
   *
   * @apiSuccess {RoleModel} content Role Details.
   *
   */

  /**
   * @api {delete} role/:id Delete
   * @apiVersion 1.0.0
   * @apiGroup Roles
   *
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {RoleModel} content Deleted Role Details.
   *
   */

  /**
   * @api {post} role/import import
   * @apiVersion 1.0.0
   * @apiGroup Roles
   *
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   * @apiUse UserIdNotFoundError
   *
   * @apiParamExample {json} Request Body:
   * [
   *    {
   *     "roleName": "Role 1",
   *     "description": "Role Description",
   *     "access": [
   *       {
   *         "feature": "paygroup",
   *         "accessType": "create"
   *       }
   *     ]
   *    }
   * ]
   *
   * @apiSuccess {RoleModel[]} content Created Role Details.
   */
}
