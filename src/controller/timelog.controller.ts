/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { ActionType } from '../constant/action-type';
import { Action } from '../decorators/action.decorators';
import { ResponseDTO } from '../dto/response.dto';
import { TimelogEntity } from '../entity/employee/timelog.entity';
import { UserEntity } from '../entity/user.entity';
import { EmployeeSiteService } from '../service/employee-site.service';
import { TimelogService } from '../service/timelog.service';
import { UserService } from '../service/user.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Controller('timelogs')
export class TimelogController extends BaseController<TimelogEntity> {
  constructor(
    readonly timelogService: TimelogService,
    private userService: UserService,
    private employeeSiteService: EmployeeSiteService
  ) {
    super(timelogService);
  }

  /**
   * @apiDefine TimelogSuccessResponse
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Retrieved",
   *       "status": 200,
   *       "content": {
   *          "id": string,
   *          "createBy": string,
   *          "updateBy": string,
   *          "time": string,
   *          "serverTime": string,
   *          "type": string,
   *          "employee": {
   *            "id": string,
   *            "employeeId": string
   *           },
   *           "site": {
   *            "id": string,
   *            "name": string
   *           }
   *       }
   *    }
   */

  /**
   *  @apiDefine TimelogRequestBody
   *  @apiParamExample {json} Request Body:
   *   {
   *      "username": string,
   *      "password": string,
   *      "time": string,
   *      "site": string
   *   }
   */

  /**
   * @apiDefine UserIdNotFoundError
   * @apiErrorExample {json} User Id Not Found Error Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "status": 400,
   *       "error": "Bad Request",
   *       "message": "User-Id not found in header"
   *     }
   */

  /**
   * @apiDefine UserNotFoundError
   * @apiErrorExample {json} User Not Found Error Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "status": 404,
   *       "error": "Not Found",
   *       "message": "User not found"
   *     }
   */

  /**
   * @apiDefine PasswordIncorrectError
   * @apiErrorExample {json} Credentials Incorrect Error Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "status": 40,
   *       "error": "Forbidden",
   *       "message": "Error"
   *     }
   */

  /**
   * @apiDefine UserNotFoundInSiteError
   * @apiErrorExample {json} User Not Found In Site Error Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "status": 404,
   *       "error": "Not Found",
   *       "message": "User is not assigned to this site"
   *     }
   */

  /**
   * @api {post} /timelog/save Create time log for specific employee
   * @apiGroup Timelog
   * @apiParamExample {json} Request Body:
   *   {
   *      "employee": string,
   *      "time": string,
   *      "site": string,
   *      "type": string,
   *   }
   */
  @Post('/save')
  async saveLog(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Req() request: any,
    @Body() body: Partial<TimelogEntity>
  ) {
    const { id } = request.user as UserEntity;
    const saved = await this.timelogService.saveLog({ ...body, createBy: id });
    return new ResponseDTO('Success', saved, 200);
  }

  @Put('/edit')
  async editlog(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Req() request: any,
    @Body() body: Partial<TimelogEntity>
  ) {
    const { id } = request.user as UserEntity;
    await this.timelogService.update({ ...body, createBy: id });

    const updated = await this.timelogService.repository.findOne({
      where: {
        id: body.id,
      },
      relations: ['employee'],
    });

    return new ResponseDTO('Success', updated, 200);
  }

  /**
   * @api {post} /timelog/:type Create
   * @apiParam {String='clock-in','clock-out','break-in','break-out'} type Timelog Type
   *
   * @apiVersion 1.0.0
   * @apiName Timelog Save
   * @apiGroup Timelog
   *
   * @apiUse TimelogRequestBody
   * @apiUse UserIdNotFoundError
   * @apiUse UserNotFoundError
   * @apiUse PasswordIncorrectError
   * @apiUse UserNotFoundInSiteError
   *
   * @apiUse TimelogSuccessResponse
   *
   */
  @Post(':type')
  async save(@Req() request, @Param('type') type: string, @Body() body: any) {
    //   Check first if username and password exists
    const { username, password } = body;
    const user = await this.userService.getByUsernameAndPassword(
      username,
      password
    );

    // Check if employee is link to site
    const { site } = body;
    const { employee } = user;
    await this.employeeSiteService.getByEmployeeAndSite(employee, site);

    body = { ...body, type, employee };
    return super.create(request, body);
  }

  /**
   * @api {get} /timelog/list Get List
   *
   * @apiParam {Number=1,2,3, ... n} [pageNo=0] Page Number of page.
   * @apiParam {Number=1,2,3, ... n} [pageSize=25] Page Size of page.
   * @apiParam {String={fieldName}|{fieldValue},{fieldName}|{fieldValue},...} [filter] Search Filter.
   * @apiParam {String={fieldName}} [orderBy] Order By Column.
   * @apiParam {String='ASC'|'DESC'} [sort='DESC'] Sort Order Column.
   *
   * @apiVersion 1.0.0
   * @apiName Timelog Fetch List
   * @apiGroup Timelog
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
   * @api {get} /timelog/employee/:id Get timelog for employee
   *
   * @apiVersion 1.0.0
   * @apiName Fetch Employee Timelog
   * @apiGroup Timelog
   *
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Retrieved...",
   *       "content": {
   *           "01/09/2020": {
   *               "clockIn": "09:00:00",
   *               "breakIn": "12:00:00",
   *               "breakOut": "12:00:00",
   *               "clockOut": "17:00:00"
   *           },
          },
          "status": 200
      }
   */

  @Get('employee/:employeeId')
  @Action(ActionType.READ)
  async getListByEmployee(
    @Param('employeeId') employeeId: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string
  ) {
    const list = await this.timelogService.getTimelogsByEmployee(
      employeeId,
      dateFrom,
      dateTo
    );

    return new ResponseDTO('Retrieved...', list, HttpStatus.OK);
  }

  @Get('template')
  @Action(ActionType.READ)
  async getTemplate(
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
    @Query('siteId') siteId: string,
    @Res() response
  ) {
    const workbook = await this.timelogService.generateTemplate({
      dateFrom,
      dateTo,
      siteId,
    });
    response.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=timesheet_template.xlsx',
    });
    response.send(workbook);
  }

  @Post('timesheet/import')
  @Action(ActionType.CREATE)
  @UseInterceptors(FileInterceptor('file'))
  async importTimeSheet(@UploadedFile() file: any, @Req() req: any) {
    const user: UserEntity = req.user;
    const timelogs = await this.timelogService.importFromFile(file, user);
    return new ResponseDTO('Success', timelogs, HttpStatus.CREATED);
  }
}
