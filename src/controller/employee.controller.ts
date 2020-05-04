/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Like } from 'typeorm';

import { ActionType } from '../constant/action-type';
import { ACCESS } from '../constant/api-features';
import { Action, Feature } from '../decorators/action.decorators';
import { ResponseDTO } from '../dto/response.dto';
import { EmployeeEntity } from '../entity/employee/employee.entity';
import { UserEntity } from '../entity/user.entity';
import { RolesGuard } from '../guards/roles.guard';
import { EmployeeService } from '../service/employee.service';
import { UserService } from '../service/user.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Feature(ACCESS.EMPLOYEES)
@Controller('employees')
export class EmployeeController extends BaseController<EmployeeEntity> {
  constructor(
    readonly employeeService: EmployeeService,
    readonly userService: UserService
  ) {
    super(employeeService);
  }

  /**
   * @apiDefine EmployeeSuccessResponse
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Retrieved",
   *       "status": 200,
   *       "content": {
   *          "id": string,
   *          "createBy": string,
   *          "updateBy": string,
   *          "employeeId": string,
   *          "firstName": string,
   *          "middleName": string,
   *          "lastName": string,
   *          "gender": string,
   *          "birthDate": Date,
   *          "civilStatus": string,
   *          "contact": {
   *              "contactNumber": string,
   *              "homeAddress": string,
   *              "zipCode": string,
   *              "emailAddress": string
   *         },
   *         "governmentNumbers": {
   *              "sssNumber": string,
   *              "philHealthNumber": string,
   *              "TIN": string,
   *              "hdmfNumber": string
   *         },
   *         "salaryDetails": {
   *             "isMinimumWageEarner": boolean,
   *             "isDailyPaid": boolean,
   *             "cola": number,
   *             "workDaysPerYear": number,
   *             "basicSalary": number,
   *             "deMinimis": number,
   *             "additionalHdmfContribution": number,
   *             "rateTable": {
   *                "id": string,
   *                "name": string,
   *                "description": string,
   *                "rates": [
   *                  {
   *                     "id": string,
   *                     "name": string,
   *                     "regular": number,
   *                     "overtime": number,
   *                     "nightDiff": number,
   *                     "nightDiffOT": number,
   *                     "type": string
   *                   }
   *                ]
   *             },
   *             "contribution": {
   *                 "tax": number,
   *                 "pagibig": {
   *                    "employee": number,
   *                    "employer": number,
   *                    "total": number
   *                 },
   *                 "philhealth": {
   *                    "employee": number,
   *                    "employer": number,
   *                    "total": number
   *                 },
   *                 "sss": {
   *                    "employee": number,
   *                    "employer": number,
   *                    "total": number
   *                 }
   *              }
   *         },
   *         "jobDetails": {
   *             "jobTitle": string,
   *             "hireDate": Date,
   *             "statusDate": Date,
   *             "workHrsPerDay": number,
   *             "payGroup": {
   *                  "name": string
   *             },
   *             "isROHQ": boolean,
   *             "isConsultant": boolean,
   *             "department": {
   *                  "name": string,
   *                  "code": string,
   *                  "remarks": string
   *             },
   *             "costCenter": {
   *                  "name": string,
   *                  "code": string,
   *                  "remarks": string
   *             },
   *             "employmentStatus": {
   *                 "status": string
   *             }
   *         },
   *         "leaveCredits": {
   *             "sickLeave": number,
   *             "vacationLeave": number,
   *             "credit": number
   *         },
   *         "dependents": [
   *            {
   *              "name": string,
   *              "birthDate": string,
   *              "relationship": string
   *            }
   *         ],
   *         "bankDetails": {
   *             "bank": string,
   *             "bankAccountType": string,
   *             "bankAccountNumber": string
   *         },
   *         "previousEmploymentDetails": {
   *             "hasPreviousEmployment": boolean,
   *             "nonTax13thMonth": number,
   *             "nonTaxOtherBonus": number,
   *             "nonTaxSalaries": number,
   *             "prev13thMonth": number,
   *             "otherBonus": number,
   *             "taxableGross": number,
   *             "taxWithheld": number,
   *             "govDeductions": number,
   *             "deMinimis": number,
   *             "taxableCompensation": number,
   *             "monetizedLeave": number
   *         },
   *         "company": {
   *             "companyName": string
   *         }
   *       }
   *     }
   */

  /**
   *  @apiDefine EmployeeRequestBody
   *  @apiParamExample {json} Request Body:
   *  {
   *          "employeeId": string,
   *          "firstName": string,
   *          "middleName": string,
   *          "lastName": string,
   *          "gender": 'Male' | 'Female',
   *          "birthDate": Date,
   *          "civilStatus": 'Single' | 'Married' | 'Widowed',
   *          "username": string,
   *          "contact": {
   *              "contactNumber": string,
   *              "homeAddress": string,
   *              "zipCode": string,
   *              "emailAddress": string
   *         },
   *         "governmentNumbers": {
   *                 "sssNumber": string,
   *                 "philHealthNumber": string
   *                 "TIN": string,
   *                 "hdmfNumber": string
   *         },
   *         "salaryDetails": {
   *             "isMinimumWageEarner": boolean,
   *             "isDailyPaid": boolean,
   *             "cola": number,
   *             "workDaysPerYear": number,
   *             "basicSalary": number,
   *             "deMinimis": number,
   *             "additionalHdmfContribution": number,
   *             "rateTable": string,
   *         },
   *         "jobDetails": {
   *             "jobTitle": string,
   *             "hireDate": Date,
   *             "statusDate": Date,
   *             "workHrsPerDay": number,
   *             "payGroup": string,
   *             "isROHQ": boolean,
   *             "isConsultant": boolean,
   *             "department": string,
   *             "costCenter": string,
   *             "employmentStatus": string
   *         },
   *         "leaveCredits": {
   *             "sickLeave": number,
   *             "vacationLeave": number,
   *             "credit": number
   *         },
   *         "dependents": [
   *            {
   *              "name": string,
   *              "birthDate": string,
   *              "relationship": string
   *            }
   *         ],
   *         "bankDetails": {
   *             "bank": string,
   *             "bankAccountType": 'Savings' | 'Current',
   *             "bankAccountNumber": string
   *         },
   *         "previousEmploymentDetails": {
   *             "hasPreviousEmployment": boolean,
   *             "nonTax13thMonth": number,
   *             "nonTaxOtherBonus": number,
   *             "nonTaxSalaries": number,
   *             "prev13thMonth": number,
   *             "otherBonus": number,
   *             "taxableGross": number,
   *             "taxWithheld": number,
   *             "govDeductions": number,
   *             "deMinimis": number,
   *             "taxableCompensation": number,
   *             "monetizedLeave": number
   *         }
   *       },
   *       "company": string
   */

  /**
   * @apiDefine UserIdNotFoundError
   * @apiErrorExample {json} Error Response:
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "statusCode": 400,
   *       "error": "Bad Request",
   *       "message": "User-Id not found in header"
   *     }
   */

  /**
   * @api {get} /employee/:id Get By Id
   * @apiParam {Number} id Employee's unique Id
   *
   * @apiVersion 1.0.0
   * @apiName Employee Fetch
   * @apiGroup Employee
   *
   * @apiUse EmployeeSuccessResponse
   *
   */

  /**
   * @api {get} /employee/list Get List
   *
   * @apiParam {Number=1,2,3, ... n} [pageNo=0] Page Number of page.
   * @apiParam {Number=1,2,3, ... n} [pageSize=25] Page Size of page.
   * @apiParam {String={fieldName}|{fieldValue},{fieldName}|{fieldValue},...} [filter] Search Filter.
   * @apiParam {String={fieldName}} [orderBy] Order By Column.
   * @apiParam {String='ASC'|'DESC'} [sort='DESC'] Sort Order Column.
   *
   * @apiVersion 1.0.0
   * @apiName Employee Fetch List
   * @apiGroup Employee
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
   * @api {post} /employee Create
   * @apiVersion 1.0.0
   * @apiName Employee Save
   * @apiGroup Employee
   *
   * @apiUse EmployeeRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Employee.
   *
   */
  @Post()
  async createEmployee(@Req() request: any, @Body() entity: EmployeeEntity) {
    const { companyId } = request.user as UserEntity;
    entity.companyId = companyId;
    return super.create(request, entity);
  }

  /**
   * @api {get} /employee/validate/employee-id/:employeeId
   * @apiVersion 1.0.0
   * @apiName Validate Employee ID
   * @apiGroup Employee
   *
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated Employee.
   *
   */
  @Get('validate/employee-id/:employeeId')
  @Action(ActionType.READ)
  async validateEmployeeId(@Param('employeeId') employeeId: string) {
    const employee = await this.employeeService.checkIfEmployeeIdExists(
      employeeId
    );

    return new ResponseDTO(
      'Saved Succesfully',
      { valid: !employee },
      HttpStatus.CREATED
    );
  }

  /**
   * @api {put} /employee/generate-id
   * @apiVersion 1.0.0
   * @apiName Generates next available employee number
   * @apiGroup Employee
   *
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated Employee.
   *
   */
  @Get('generate-id')
  async getNextEmployeeNumber() {
    const ctr = await this.employeeService.getEmployeeCount();
    const employeeId = this.employeeService.generateEmployeeId(ctr);
    return new ResponseDTO('Success', employeeId, 200);
  }

  /**
   * @api {put} /employee/:id Update
   * @apiParam {Number} id Employee's unique Id to be Updated
   * @apiVersion 1.0.0
   * @apiName Employee Update
   * @apiGroup Employee
   *
   * @apiUse EmployeeRequestBody
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Updated Employee.
   *
   */

  /**
   * @api {delete} /employee/:id Delete
   * @apiParam {Number} id Employee's unique Id to be Deleted
   * @apiVersion 1.0.0
   * @apiName Employee Remove
   * @apiGroup Employee
   *
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Deleted Employee.
   *
   */

  /**
   * @api {post} /employee/import Import
   * @apiVersion 1.0.0
   * @apiName Employee Bulk Save
   * @apiGroup Employee
   *
   * @apiParam {Array} RequestBody Array of Employee Request Body.
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {json} Response JSON of the Created Employees.
   *
   */
  @Post('/import')
  @Action(ActionType.CREATE)
  @UseInterceptors(FileInterceptor('file'))
  async importEmployees(@UploadedFile() file: any, @Req() req: any) {
    const user: UserEntity = req.user;
    const employeeList = await this.employeeService.importFromFile(file, user);
    return new ResponseDTO('Success', employeeList, HttpStatus.CREATED);
  }

  @Get('search')
  async searchEmployee(@Query('query') querystring: string) {
    const list = await this.employeeService.repository.find({
      where: [
        { firstName: Like(`%${querystring}%`), isDeleted: 0 },
        { lastName: Like(`%${querystring}%`), isDeleted: 0 },
      ],
    });
    return new ResponseDTO('success', list, 200);
  }

  @Get('paygroup/:payGroupId')
  async getByPaygroup(@Param('payGroupId') payGroupId: string) {
    return new ResponseDTO('success', { payGroupId }, 200);
  }

  @Get('list/with-completed-info')
  async getEmployeesWithCompleteInfo() {
    const list = await this.employeeService.getEmployeesWithCompleteInfo();
    return new ResponseDTO('success', list, 200);
  }
}
