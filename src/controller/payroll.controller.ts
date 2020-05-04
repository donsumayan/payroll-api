import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ActionType } from '../constant/action-type';
import { ACCESS } from '../constant/api-features';
import { Action, Feature } from '../decorators/action.decorators';
import { ResponseDTO } from '../dto/response.dto';
import { RolesGuard } from '../guards/roles.guard';
import { EmployeeService } from '../service/employee.service';
import { PayrollComputationService } from '../service/payroll-computation.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Feature(ACCESS.PAYROLL)
@Controller('payroll')
export class PayrollController {
  constructor(
    private readonly payrollComputationService: PayrollComputationService,
    private readonly employeeService: EmployeeService
  ) {}

  /**
   * @apiDefine PayrollSuccessResponse
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Retrieved",
   *       "status": 200,
   *       "content": {
   *           { ddd MM/DD }: {
   *              "clockIn": string,
   *              "clockOut": string,
   *              "workHrsPerDay": number,
   *              "totalWorkingHrs": number,
   *              "totalBreakHrs": number,
   *              "regularHrs": number,
   *              "overtimeHrs": number,
   *              "nightDiffHrs": number,
   *              "multiplier": 'Ordinary' | 'Rest Day' | 'Special Holiday' | 'Special Holiday Rest Day' | 'Legal Holiday' |
   *                            'Legal Holiday Rest Day' | 'Double Holiday' | 'Double Holiday Rest Day',
   *              "regularRate": number,
   *              "overTimeRate": number | undefined,
   *              "nightDiffRate": number | undefined,
   *              "totalPay": number
   *          },
   *          { ddd MM/DD }: {
   *              "clockIn": string,
   *              "clockOut": string,
   *              "workHrsPerDay": number,
   *              "totalWorkingHrs": number,
   *              "totalBreakHrs": number,
   *              "regularHrs": number,
   *              "overtimeHrs": number,
   *              "nightDiffHrs": number,
   *              "multiplier": 'Ordinary' | 'Rest Day' | 'Special Holiday' | 'Special Holiday Rest Day' | 'Legal Holiday' |
   *                            'Legal Holiday Rest Day' | 'Double Holiday' | 'Double Holiday Rest Day',
   *              "regularRate": number,
   *              "overTimeRate": number | undefined,
   *              "nightDiffRate": number | undefined,
   *              "totalPay": number
   *          },
   *          .
   *          .
   *          .
   *       }
   *    }
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
   * @api {get} /payroll/employee/:id Get Payroll Calculation Per Employee
   * @apiParam {Number} id Employee's unique Id
   *
   * @apiParam {String=YYYY-MM-DD} dateFrom Pay Period Start Date
   * @apiParam {String=YYYY-MM-DD} dateTo Pay Period End Date
   *
   * @apiVersion 1.0.0
   * @apiName Payroll Fetch By Employee
   * @apiGroup Payroll
   *
   * @apiUse PayrollSuccessResponse
   *
   */
  @Get('employee/:id')
  @Action(ActionType.READ)
  async getByEmployee(
    @Param('id') id: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string
  ) {
    const details = await this.payrollComputationService.calculatePerEmployee(
      id,
      dateFrom,
      dateTo
    );

    return new ResponseDTO('Retrieved...', details, HttpStatus.OK);
  }
}
