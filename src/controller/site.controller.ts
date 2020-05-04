import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ACCESS } from '../constant/api-features';
import { Feature } from '../decorators/action.decorators';
import { SiteEntity } from '../entity/site.entity';
import { SiteService } from '../service/site.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Feature(ACCESS.SITES)
@Controller('sites')
export class SiteController extends BaseController<SiteEntity> {
  constructor(readonly siteService: SiteService) {
    super(siteService);
  }

  /**
   * @apiDefine SiteSuccessResponse
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
   *          "contactNumber": string,
   *          "address": string,
   *          "zipCode": string,
   *          "emailAddress": string
   *       }
   *    }
   */

  /**
   *  @apiDefine SiteRequestBody
   *  @apiParamExample {json} Request Body:
   *   {
   *      "name": string,
   *      "contactNumber": string,
   *      "address": string,
   *      "zipCode": string,
   *      "emailAddress": string
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
   * @api {get} /site/:id Get By Id
   * @apiParam {Number} id Site's unique Id
   *
   * @apiVersion 1.0.0
   * @apiName Site Fetch
   * @apiGroup Site
   *
   * @apiUse SiteSuccessResponse
   *
   */

  /**
   * @api {get} /site/list Get List
   *
   * @apiParam {Number=1,2,3, ... n} [pageNo=0] Page Number of page.
   * @apiParam {Number=1,2,3, ... n} [pageSize=25] Page Size of page.
   * @apiParam {String={fieldName}|{fieldValue},{fieldName}|{fieldValue},...} [filter] Search Filter.
   * @apiParam {String={fieldName}} [orderBy] Order By Column.
   * @apiParam {String='ASC'|'DESC'} [sort='DESC'] Sort Order Column.
   *
   * @apiVersion 1.0.0
   * @apiName Site Fetch List
   * @apiGroup Site
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
   * @api {post} /site Create
   * @apiVersion 1.0.0
   * @apiName Site Save
   * @apiGroup Site
   *
   * @apiUse SiteRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Site.
   *
   */

  /**
   * @api {put} /site/:id Update
   * @apiParam {Number} id Site's unique Id to be Updated
   * @apiVersion 1.0.0
   * @apiName Site Update
   * @apiGroup Site
   *
   * @apiUse SiteRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated Site.
   *
   */
  /**
   * @api {delete} /site/:id Delete
   * @apiParam {Number} id Site's unique Id to be Deleted
   * @apiVersion 1.0.0
   * @apiName Site Remove
   * @apiGroup Site
   *
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Deleted Cost Center.
   *
   */

  /**
   * @api {post} /site/import Import
   * @apiVersion 1.0.0
   * @apiName Site Bulk Save
   * @apiGroup Site
   *
   * @apiParam {Array} RequestBody Array of Site Request Body.
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Sites.
   *
   */
}
