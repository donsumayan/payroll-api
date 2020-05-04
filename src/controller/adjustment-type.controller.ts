import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AdjustmentTypeEntity } from '../entity/company/adjustment/adjustment-type.entity';
import { AdjustmentTypeService } from '../service/adjustment-type.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Controller('adjustment-type')
export class AdjustmentTypeController extends BaseController<
  AdjustmentTypeEntity
> {
  constructor(readonly adjustmentTypeService: AdjustmentTypeService) {
    super(adjustmentTypeService);
  }

  /**
   * @apiDefine AdjustmentTypeSuccessResponse
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Retrieved",
   *       "status": 200,
   *       "content": {
   *          "id": string,
   *          "createBy": string,
   *          "updateBy": string,
   *          "name": string
   *       }
   *    }
   */

  /**
   *  @apiDefine AdjustmentTypeRequestBody
   *  @apiParamExample {json} Request Body:
   *   {
   *      "name": string
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
   * @api {get} /adjustment-type/:id Get By Id
   * @apiParam {Number} id Adjustment Type's unique Id
   *
   * @apiVersion 1.0.0
   * @apiName Adjustment Type Fetch
   * @apiGroup Adjustment Type
   *
   * @apiUse AdjustmentTypeSuccessResponse
   *
   */

  /**
   * @api {get} /adjustment-type/list Get List
   *
   * @apiParam {Number=1,2,3, ... n} [pageNo=0] Page Number of page.
   * @apiParam {Number=1,2,3, ... n} [pageSize=25] Page Size of page.
   * @apiParam {String={fieldName}|{fieldValue},{fieldName}|{fieldValue},...} [filter] Search Filter.
   * @apiParam {String={fieldName}} [orderBy] Order By Column.
   * @apiParam {String='ASC'|'DESC'} [sort='DESC'] Sort Order Column.
   *
   * @apiVersion 1.0.0
   * @apiName Adjustment Type Fetch List
   * @apiGroup Adjustment Type
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
   * @api {post} /adjustment-type Create
   * @apiVersion 1.0.0
   * @apiName Adjustment Type Save
   * @apiGroup Adjustment Type
   *
   * @apiUse AdjustmentTypeRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Adjustment Type.
   *
   */

  /**
   * @api {put} /adjustment-type/:id Update
   * @apiParam {Number} id Adjustment Type's unique Id to be Updated
   * @apiVersion 1.0.0
   * @apiName Adjustment Type Update
   * @apiGroup Adjustment Type
   *
   * @apiUse AdjustmentTypeRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated Adjustment Type.
   *
   */

  /**
   * @api {delete} /adjustment-type/:id Delete
   * @apiParam {Number} id Adjustment Type's unique Id to be Deleted
   * @apiVersion 1.0.0
   * @apiName Adjustment Type Remove
   * @apiGroup Adjustment Type
   *
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Deleted Adjustment Type.
   *
   */

  /**
   * @api {post} /adjustment-type/import Import
   * @apiVersion 1.0.0
   * @apiName Adjustment Type Bulk Save
   * @apiGroup Adjustment Type
   *
   * @apiParam {Array} RequestBody Array of Adjustment Type Request Body.
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Adjustment Types.
   *
   */
}
