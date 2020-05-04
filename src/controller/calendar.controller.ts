import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ACCESS } from '../constant/api-features';
import { Feature } from '../decorators/action.decorators';
import { CalendarDayEntity } from '../entity/calendar-day.entity';
import { CalendarService } from '../service/calendar.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Feature(ACCESS.CALENDAR)
@Controller('calendar')
export class CalendarController extends BaseController<CalendarDayEntity> {
  constructor(readonly service: CalendarService) {
    super(service);
  }

  /**
   * @apiDefine HolidaySuccessResponse
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
   *          "date": string,
   *          "type": string
   *       }
   *    }
   */

  /**
   *  @apiDefine HolidayRequestBody
   *  @apiParamExample {json} Request Body:
   *   {
   *      "name": string,
   *      "date": string,
   *      "type": 'legalHoliday' | 'legalHolidayRestDay' | 'specialHoliday' | 'specialHolidayRestDay' | 'doubleHoliday' | 'doubleHolidayRestDay'
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
   * @api {get} /holiday/:id Get By Id
   * @apiParam {Number} id Holiday's unique Id
   *
   * @apiVersion 1.0.0
   * @apiName Holiday Fetch
   * @apiGroup Holiday
   *
   * @apiUse HolidaySuccessResponse
   *
   */

  /**
   * @api {get} /holiday/list Get List
   *
   * @apiParam {Number=1,2,3, ... n} [pageNo=0] Page Number of page.
   * @apiParam {Number=1,2,3, ... n} [pageSize=25] Page Size of page.
   * @apiParam {String={fieldName}|{fieldValue},{fieldName}|{fieldValue},...} [filter] Search Filter.
   * @apiParam {String={fieldName}} [orderBy] Order By Column.
   * @apiParam {String='ASC'|'DESC'} [sort='DESC'] Sort Order Column.
   *
   * @apiVersion 1.0.0
   * @apiName Holiday Fetch List
   * @apiGroup Holiday
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
   * @api {post} /holiday Create
   * @apiVersion 1.0.0
   * @apiName Holiday Save
   * @apiGroup Holiday
   *
   * @apiUse HolidayRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Holiday.
   *
   */

  /**
   * @api {put} /holiday/:id Update
   * @apiParam {Number} id Holiday's unique Id to be Updated
   * @apiVersion 1.0.0
   * @apiName Holiday Update
   * @apiGroup Holiday
   *
   * @apiUse HolidayRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated Holiday.
   *
   */

  /**
   * @api {delete} /holiday/:id Delete
   * @apiParam {Number} id Holiday's unique Id to be Deleted
   * @apiVersion 1.0.0
   * @apiName Holiday Remove
   * @apiGroup Holiday
   *
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Deleted Holiday.
   *
   */

  /**
   * @api {post} /holiday/import Import
   * @apiVersion 1.0.0
   * @apiName Holiday Bulk Save
   * @apiGroup Holiday
   *
   * @apiParam {Array} RequestBody Array of Holiday Request Body.
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Holidays.
   *
   */
}
