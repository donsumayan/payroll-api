import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ACCESS } from '../constant/api-features';
import { Feature } from '../decorators/action.decorators';
import { EmploymentStatusEntity } from '../entity/employee/employment-status.entity';
import { RolesGuard } from '../guards/roles.guard';
import { EmploymentStatusService } from '../service/employment-status.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Feature(ACCESS.EMPLOYEES)
@Controller('employment-status')
export class EmploymentStatusController extends BaseController<
  EmploymentStatusEntity
> {
  constructor(readonly service: EmploymentStatusService) {
    super(service);
  }

  /**
   * @apiDefine EmploymentStatusSuccessResponse
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Retrieved",
   *       "status": 200,
   *       "content": {
   *          "id": string,
   *          "createBy": string,
   *          "updateBy": string,
   *          "status": string,
   *       }
   *    }
   */

  /**
   *  @apiDefine EmploymentStatusRequestBody
   *  @apiParamExample {json} Request Body:
   *   {
   *      "status": string,
   *   }
   */

  /**
   * @api {get} /employment-status/:id Get By Id
   * @apiParam {Number} id Employment Status unique Id
   *
   * @apiVersion 1.0.0
   * @apiName Fetch
   * @apiGroup Employment Status
   *
   * @apiUse EmploymentStatusSuccessResponse
   *
   */

  /**
   * @api {get} /employment-status/list Get List
   *
   * @apiParam {Number=1,2,3, ... n} [pageNo=0] Page Number of page.
   * @apiParam {Number=1,2,3, ... n} [pageSize=25] Page Size of page.
   * @apiParam {String={fieldName}|{fieldValue},{fieldName}|{fieldValue},...} [filter] Search Filter.
   * @apiParam {String={fieldName}} [orderBy] Order By Column.
   * @apiParam {String='ASC'|'DESC'} [sort='DESC'] Sort Order Column.
   *
   * @apiVersion 1.0.0
   * @apiName Fetch List
   * @apiGroup Employment Status
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
   * @api {post} /employment-status Create
   * @apiVersion 1.0.0
   * @apiName Create
   * @apiGroup Employment Status
   *
   * @apiUse EmploymentStatusRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created employment-status.
   *
   */

  /**
   * @api {put} /employment-status/:id Update
   * @apiParam {Number} id Employment Status' unique Id to be Updated
   * @apiVersion 1.0.0
   * @apiName Update
   * @apiGroup Employment Status
   *
   * @apiUse EmploymentStatusRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated employment-status.
   *
   */

  /**
   * @api {delete} /employment-status/:id Delete
   * @apiParam {Number} id Employment Status's unique Id to be Deleted
   * @apiVersion 1.0.0
   * @apiName Employment Status Remove
   * @apiGroup Employment Status
   *
   * @apiUse UserIdNotFoundError
   * @apiSuccess {json} Response JSON of the Deleted Employment Status.
   *
   */

  /**
   * @api {post} /Employment Status/import Import
   * @apiVersion 1.0.0
   * @apiName Employment Status Bulk Save
   * @apiGroup Employment Status
   *
   * @apiParam {Array} RequestBody Array of Employment Status Request Body.
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Employment Statuss.
   *
   */
}
