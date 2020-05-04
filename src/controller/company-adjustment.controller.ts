import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CompanyAdjustmentEntity } from '../entity/company/adjustment/company-adjustment.entity';
import { CompanyAdjustmentService } from '../service/company-adjustment.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Controller('company-adjustment')
export class CompanyAdjustmentController extends BaseController<
  CompanyAdjustmentEntity
> {
  constructor(readonly companyAdjustmentService: CompanyAdjustmentService) {
    super(companyAdjustmentService);
  }

  /**
   * @apiDefine CompanyAdjustmentSuccessResponse
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
   *          "amount": number,
   *          "appliedBeforeTax": boolean,
   *          "taxable": boolean,
   *          "maxAmount": number,
   *          "remarks": string,
   *          "amtProvidedPerPeriod": boolean,
   *          "type": {
   *            "name": string
   *          }
   *       }
   *    }
   */

  /**
   *  @apiDefine CompanyAdjustmentRequestBody
   *  @apiParamExample {json} Request Body:
   *   {
   *      "name": string,
   *      "code": string,
   *      "amount": number,
   *      "appliedBeforeTax": boolean,
   *      "taxable": boolean,
   *      "maxAmount": number,
   *      "remarks": string,
   *      "amtProvidedPerPeriod": boolean,
   *      "type": string
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
   * @api {get} /company-adjustment/:id Get By Id
   * @apiParam {Number} id Company Adjustment's unique Id
   *
   * @apiVersion 1.0.0
   * @apiName Company Adjustment Fetch
   * @apiGroup Company Adjustment
   *
   * @apiUse CompanyAdjustmentSuccessResponse
   *
   */

  /**
   * @api {get} /company-adjustment/list Get List
   *
   * @apiParam {Number=1,2,3, ... n} [pageNo=0] Page Number of page.
   * @apiParam {Number=1,2,3, ... n} [pageSize=25] Page Size of page.
   * @apiParam {String={fieldName}|{fieldValue},{fieldName}|{fieldValue},...} [filter] Search Filter.
   * @apiParam {String={fieldName}} [orderBy] Order By Column.
   * @apiParam {String='ASC'|'DESC'} [sort='DESC'] Sort Order Column.
   *
   * @apiVersion 1.0.0
   * @apiName Company Adjustment Fetch List
   * @apiGroup Company Adjustment
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
   * @api {post} /company-adjustment Create
   * @apiVersion 1.0.0
   * @apiName Company Adjustment Save
   * @apiGroup Company Adjustment
   *
   * @apiUse CompanyAdjustmentRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Company Adjustment.
   *
   */

  /**
   * @api {put} /company-adjustment/:id Update
   * @apiParam {Number} id Company Adjustment's unique Id to be Updated
   * @apiVersion 1.0.0
   * @apiName Company Adjustment Update
   * @apiGroup Company Adjustment
   *
   * @apiUse CompanyAdjustmentRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated Company Adjustment.
   *
   */

  /**
   * @api {delete} /company-adjustment/:id Delete
   * @apiParam {Number} id Company Adjustment's unique Id to be Deleted
   * @apiVersion 1.0.0
   * @apiName Company Adjustment Remove
   * @apiGroup Company Adjustment
   *
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Deleted Company Adjustment.
   *
   */

  /**
   * @api {post} /company-adjustment/import Import
   * @apiVersion 1.0.0
   * @apiName Company Adjustment Bulk Save
   * @apiGroup Company Adjustment
   *
   * @apiParam {Array} RequestBody Array of Company Adjustment Request Body.
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Company Adjustments.
   *
   */
}
