import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ACCESS } from '../constant/api-features';
import { Feature } from '../decorators/action.decorators';
import { DepartmentEntity } from '../entity/department.entity';
import { DepartmentService } from '../service/department.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Feature(ACCESS.DEPARTMENTS)
@Controller('department')
export class DepartmentController extends BaseController<DepartmentEntity> {
  constructor(readonly departmentService: DepartmentService) {
    super(departmentService);
  }

  /**
   * @apiDefine DepartmentSuccessResponse
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Retrieved",
   *       "status": 200,
   *       "content": {
   *          "id": string,
   *          "createBy": string,
   *          "updateBy": string,
   *          "name": string,
   *          "code": string,
   *          "remarks": string
   *       }
   *    }
   */

  /**
   *  @apiDefine DepartmentRequestBody
   *  @apiParamExample {json} Request Body:
   *   {
   *      "name": string,
   *      "code": string,
   *      "remarks": string
   *   }
   */

  /**
   * @apiDefine UserIdNotFoundError
   * @apiErrorExample {json} Error Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "status": 400,
   *       "error": "Bad Request",
   *       "message": "User-Id not found in header"
   *     }
   */

  /**
   * @api {get} /department/:id Get By Id
   * @apiParam {Number} id Department's unique Id
   *
   * @apiVersion 1.0.0
   * @apiName Department Fetch
   * @apiGroup Department
   *
   * @apiUse DepartmentSuccessResponse
   *
   */
  /**
   * @api {get} /department/list Get List
   *
   * @apiParam {Number=1,2,3, ... n} [pageNo=0] Page Number of page.
   * @apiParam {Number=1,2,3, ... n} [pageSize=25] Page Size of page.
   * @apiParam {String={fieldName}|{fieldValue},{fieldName}|{fieldValue},...} [filter] Search Filter.
   * @apiParam {String={fieldName}} [orderBy] Order By Column.
   * @apiParam {String='ASC'|'DESC'} [sort='DESC'] Sort Order Column.
   *
   * @apiVersion 1.0.0
   * @apiName Department Fetch List
   * @apiGroup Department
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
   * @api {post} /department Create
   * @apiVersion 1.0.0
   * @apiName Department Save
   * @apiGroup Department
   *
   * @apiUse DepartmentRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Department.
   *
   */

  /**
   * @api {put} /department/:id Update
   * @apiParam {Number} id Department's unique Id to be Updated
   * @apiVersion 1.0.0
   * @apiName Department Update
   * @apiGroup Department
   *
   * @apiUse DepartmentRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated Department.
   *
   */

  /**
   * @api {delete} /department/:id Delete
   * @apiParam {Number} id Department's unique Id to be Deleted
   * @apiVersion 1.0.0
   * @apiName Department Remove
   * @apiGroup Department
   *
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Deleted Cost Center.
   *
   */

  /**
   * @api {post} /department/import Import
   * @apiVersion 1.0.0
   * @apiName Department Bulk Save
   * @apiGroup Department
   *
   * @apiParam {Array} RequestBody Array of Department Request Body.
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Departments.
   *
   */
}
