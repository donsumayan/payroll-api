import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ACCESS } from '../constant/api-features';
import { Feature } from '../decorators/action.decorators';
import { CostCenterEntity } from '../entity/cost-center.entity';
import { CostCenterService } from '../service/cost-center.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Feature(ACCESS.COST_CENTERS)
@Controller('cost-center')
export class CostCenterController extends BaseController<CostCenterEntity> {
  constructor(readonly costCenterService: CostCenterService) {
    super(costCenterService);
  }

  /**
   * @apiDefine CostCenterSuccessResponse
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
   *  @apiDefine CostCenterRequestBody
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
   * @api {get} /cost-center/:id Get By Id
   * @apiParam {Number} id Cost Center's unique Id
   *
   * @apiVersion 1.0.0
   * @apiName Cost Center Fetch
   * @apiGroup Cost Center
   *
   * @apiUse CostCenterSuccessResponse
   *
   */
  /**
   * @api {get} /cost-center/list Get List
   *
   * @apiParam {Number=1,2,3, ... n} [pageNo=0] Page Number of page.
   * @apiParam {Number=1,2,3, ... n} [pageSize=25] Page Size of page.
   * @apiParam {String={fieldName}|{fieldValue},{fieldName}|{fieldValue},...} [filter] Search Filter.
   * @apiParam {String={fieldName}} [orderBy] Order By Column.
   * @apiParam {String='ASC'|'DESC'} [sort='DESC'] Sort Order Column.
   *
   * @apiVersion 1.0.0
   * @apiName Cost Center Fetch List
   * @apiGroup Cost Center
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
   * @api {post} /cost-center Create
   * @apiVersion 1.0.0
   * @apiName Cost Center Save
   * @apiGroup Cost Center
   *
   * @apiUse CostCenterRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Cost Center.
   *
   */

  /**
   * @api {put} /cost-center/:id Update
   * @apiParam {Number} id Cost Center's unique Id to be Updated
   * @apiVersion 1.0.0
   * @apiName Cost Center Update
   * @apiGroup Cost Center
   *
   * @apiUse CostCenterRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated Cost Center.
   *
   */

  /**
   * @api {delete} /cost-center/:id Delete
   * @apiParam {Number} id Cost Center's unique Id to be Deleted
   * @apiVersion 1.0.0
   * @apiName Cost Center Remove
   * @apiGroup Cost Center
   *
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Deleted Cost Center.
   *
   */

  /**
   * @api {post} /cost-center/import Import
   * @apiVersion 1.0.0
   * @apiName Cost Center Bulk Save
   * @apiGroup Cost Center
   *
   * @apiParam {Array} RequestBody Array of Cost Center Request Body.
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Cost Centers.
   *
   */
}
