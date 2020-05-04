import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ActionType } from '../constant/action-type';
import { Action } from '../decorators/action.decorators';
import { LeaveLogsEntity } from '../entity/employee/leave-log.entity';
import { LeaveService } from '../service/leave.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Controller('leave')
export class LeaveController extends BaseController<LeaveLogsEntity> {
  constructor(readonly leaveService: LeaveService) {
    super(leaveService);
  }

  /**
   * @apiDefine LeaveSuccessResponse
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Retrieved",
   *       "status": 200,
   *       "content": {
   *          "id": string,
   *          "createBy": string,
   *          "updateBy": string,
   *          "start": string
   *          "end": string,
   *          "hours": number,
   *          "type": 'VL' | 'SL',
   *          "reason": string",
   *          "status": 'Waiting for Approval' | 'Approved' | 'Disapproved' | 'Cancelled',
   *          "approvedBy": string,
   *          "withPay": boolean,
   *          "employee": {
   *                "id": string,
   *                "employeeId": string,
   *                "firstName": string,
   *                "middleName": string,
   *                "lastName": string,
   *          }
   *       }
   *    }
   */

  /**
   *  @apiDefine LeaveRequestBody
   *  @apiParamExample {json} Request Body:
   *   {
   *      "start": Date,
   *      "end": Date,
   *      "hours": number,
   *      "type": 'VL' | 'SL',
   *      "reason": string,
   *      "withPay": boolean
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
   * @api {get} /leave/list Get List
   *
   * @apiParam {Number=1,2,3, ... n} [pageNo=0] Page Number of page.
   * @apiParam {Number=1,2,3, ... n} [pageSize=25] Page Size of page.
   * @apiParam {String={fieldName}|{fieldValue},{fieldName}|{fieldValue},...} [filter] Search Filter.
   * @apiParam {String={fieldName}} [orderBy] Order By Column.
   * @apiParam {String='ASC'|'DESC'} [sort='DESC'] Sort Order Column.
   *
   * @apiVersion 1.0.0
   * @apiName Leave Fetch List
   * @apiGroup Leave
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
   * @api {post} /leave/employee/:id Create
   * @apiParam {Number} id Employee's unique Id
   * @apiVersion 1.0.0
   * @apiName Leave Save
   * @apiGroup Leave
   *
   * @apiUse LeaveRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Leave.
   *
   */

  @Post('employee/:id')
  createByEmployee(
    @Param('id') id: string,
    @Req() request,
    @Body() entity: LeaveLogsEntity
  ) {
    return this.create(request, { ...entity, employeeId: id });
  }

  /**
   * @api {put} /leave/:id Update
   * @apiParam {Number} id Leave's unique Id to be Updated
   * @apiVersion 1.0.0
   * @apiName Leave Update
   * @apiGroup Leave
   *
   * @apiUse LeaveRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated Leave.
   *
   */

  /**
   * @api {delete} /leave/:id Delete
   * @apiParam {Number} id Leave's unique Id to be Deleted
   * @apiVersion 1.0.0
   * @apiName Leave Remove
   * @apiGroup Leave
   *
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Deleted Leave.
   *
   */

  /**
   * @api {post} /leave/import Import
   * @apiVersion 1.0.0
   * @apiName Leave Bulk Save
   * @apiGroup Leave
   *
   * @apiParam {Array} RequestBody Array of Leave Request Body.
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Leaves.
   *
   */

  /**
   * @api {put} /leave/:id/update-status Update Status
   * @apiParam {Number} id Leave's unique Id to be Updated
   * @apiVersion 1.0.0
   * @apiName Leave Update Status
   * @apiGroup Leave
   *
   * @apiParam {String='Waiting for Approval','Approved','Disapproved','Cancelled'} status Leave Status.
   *
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated Leave.
   *
   */
  @Put(':id/update-status')
  @Action(ActionType.UPDATE)
  async updateStatus(@Req() request, @Param('id') id: string) {
    const { status } = request.query;
    if (!status) {
      throw new BadRequestException('Leave status is required');
    }
    const savedEntity = await this.leaveService.get(id);
    return this.update(request, id, { ...savedEntity, status });
  }
}
