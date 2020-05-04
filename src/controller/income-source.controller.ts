import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Feature } from '../decorators/action.decorators';
import { IncomeSourceEntity } from '../entity/company/income-source.entity';
import { IncomeSourceService } from '../service/income-source.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Controller('income-source')
export class IncomeSourceController extends BaseController<IncomeSourceEntity> {
  constructor(readonly incomeSourceService: IncomeSourceService) {
    super(incomeSourceService);
  }

  /**
   * @apiDefine IncomeSourceSuccessResponse
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
   *          "isDeductible": boolean
   *       }
   *    }
   */

  /**
   *  @apiDefine IncomeSourceRequestBody
   *  @apiParamExample {json} Request Body:
   *   {
   *      "name": string,
   *      "isDeductible": boolean
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
   * @api {get} /income-source/:id Get By Id
   * @apiParam {Number} id Income Source's unique Id
   *
   * @apiVersion 1.0.0
   * @apiName Income Source Fetch
   * @apiGroup Income Source
   *
   * @apiUse IncomeSourceSuccessResponse
   *
   */

  /**
   * @api {get} /income-source/list Get List
   *
   * @apiParam {Number=1,2,3, ... n} [pageNo=0] Page Number of page.
   * @apiParam {Number=1,2,3, ... n} [pageSize=25] Page Size of page.
   * @apiParam {String={fieldName}|{fieldValue},{fieldName}|{fieldValue},...} [filter] Search Filter.
   * @apiParam {String={fieldName}} [orderBy] Order By Column.
   * @apiParam {String='ASC'|'DESC'} [sort='DESC'] Sort Order Column.
   *
   * @apiVersion 1.0.0
   * @apiName Income Source Fetch List
   * @apiGroup Income Source
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
   * @api {post} /income-source Create
   * @apiVersion 1.0.0
   * @apiName Income Source Save
   * @apiGroup Income Source
   *
   * @apiUse IncomeSourceRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Income Source.
   *
   */

  /**
   * @api {put} /income-source/:id Update
   * @apiParam {Number} id Income Source's unique Id to be Updated
   * @apiVersion 1.0.0
   * @apiName Income Source Update
   * @apiGroup Income Source
   *
   * @apiUse IncomeSourceRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated Income Source.
   *
   */

  /**
   * @api {delete} /income-source/:id Delete
   * @apiParam {Number} id Income Source's unique Id to be Deleted
   * @apiVersion 1.0.0
   * @apiName Income Source Remove
   * @apiGroup Income Source
   *
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Deleted Income Source.
   *
   */

  /**
   * @api {post} /income-source/import Import
   * @apiVersion 1.0.0
   * @apiName Income Source Bulk Save
   * @apiGroup Income Source
   *
   * @apiParam {Array} RequestBody Array of Income Source Request Body.
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Income Sources.
   *
   */
}
