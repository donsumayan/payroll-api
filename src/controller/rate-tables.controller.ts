import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ACCESS } from '../constant/api-features';
import { DayType } from '../constant/day-type';
import { Feature } from '../decorators/action.decorators';
import { ResponseDTO } from '../dto/response.dto';
import { RateTableEntity } from '../entity/rate-table.entity';
import { RateTableService } from '../service/rate-tables.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Feature(ACCESS.RATE_TABLES)
@Controller('rate-tables')
export class RateTablesController extends BaseController<RateTableEntity> {
  constructor(readonly rateTablesService: RateTableService) {
    super(rateTablesService);
  }

  /**
   * @apiDefine RatesSuccessResponse
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
   *          "regular": number,
   *          "overtime": number,
   *          "nightDiff": number,
   *          "nightDiffOT": number
   *       }
   *    }
   */

  /**
   *  @apiDefine RatesRequestBody
   *  @apiParamExample {json} Request Body:
   *   {
   *      "name": string,
   *      "regular": number,
   *      "overtime": number,
   *      "nightDiff": number,
   *      "nightDiffOT": number
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
   * @api {get} /rate-tables/:id Get By Id
   * @apiParam {Number} id Rate Tables's unique Id
   *
   * @apiVersion 1.0.0
   * @apiName Rate Tables Fetch
   * @apiGroup Rate Tables
   *
   * @apiUse RatesSuccessResponse
   *
   */
  /**
   * @api {get} /rate-tables/list Get List
   *
   * @apiParam {Number=1,2,3, ... n} [pageNo=0] Page Number of page.
   * @apiParam {Number=1,2,3, ... n} [pageSize=25] Page Size of page.
   * @apiParam {String={fieldName}|{fieldValue},{fieldName}|{fieldValue},...} [filter] Search Filter.
   * @apiParam {String={fieldName}} [orderBy] Order By Column.
   * @apiParam {String='ASC'|'DESC'} [sort='DESC'] Sort Order Column.
   *
   * @apiVersion 1.0.0
   * @apiName Rate Tables Fetch List
   * @apiGroup Rate Tables
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
   * @api {post} /rate-tables Create
   * @apiVersion 1.0.0
   * @apiName Rate Tables Save
   * @apiGroup Rate Tables
   *
   * @apiUse RatesRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Rate Tables.
   *
   */

  /**
   * @api {put} /rate-tables/:id Update
   * @apiParam {Number} id Rate Tables's unique Id to be Updated
   * @apiVersion 1.0.0
   * @apiName Rate Tables Update
   * @apiGroup Rate Tables
   *
   * @apiUse RatesRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated Rate Tables.
   *
   */
  /**
   * @api {delete} /rate-tables/:id Delete
   * @apiParam {Number} id Rate Tables's unique Id to be Deleted
   * @apiVersion 1.0.0
   * @apiName Rate Tables Remove
   * @apiGroup Rate Tables
   *
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Deleted Rate Tables.
   *
   */

  /**
   * @api {post} /rate-tables/import Import
   * @apiVersion 1.0.0
   * @apiName Rate Tables Bulk Save
   * @apiGroup Rate Tables
   *
   * @apiParam {Array} RequestBody Array of Rate Tables Request Body.
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Rate Tabless.
   *
   */

  @Get('types')
  getTypes() {
    return new ResponseDTO(
      'Success',
      Object.values(DayType).map((value: string) => ({
        name: value,
        id: value,
      })),
      200
    );
  }
}
