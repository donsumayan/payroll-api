/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ACCESS } from '../constant/api-features';
import { Feature } from '../decorators/action.decorators';
import { CompanyEntity } from '../entity/company/company.entity';
import { CompanyService } from '../service/company.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Feature(ACCESS.COMPANY)
@Controller('company')
export class CompanyController extends BaseController<CompanyEntity> {
  constructor(readonly companyService: CompanyService) {
    super(companyService);
  }

  /**
   * @apiDefine CompanyProfileSuccessResponse
   * @apiSuccessExample Success Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Retrieved",
   *       "status": 200,
   *       "content": {
   *           "id": string,
   *           "createBy": string,
   *           "updateBy": string,
   *           "companyLogoId": string,
   *           "companyName": string,
   *           "natureOfBusiness": string,
   *           "eSignatoryId": string,
   *           "passwordExpirationDays": number
   *            "contact": {
   *              "firstAddress": string,
   *              "secondAddress": string,
   *              "zipCode": string,
   *              "rdo": string,
   *              "emailAddress": string,
   *              "phone": string,
   *              "fax": string
   *           },
   *           "governmentNumbers": {
   *              "sssNumber": string,
   *               "philHealthNumber": string,
   *               "TIN": string,
   *               "hdmfNumber": string
   *           },
   *           "signatories": {
   *              "admin": {
   *                 "authorizedPerson": string,
   *                 "positionTitle": string
   *              },
   *              "finance": {
   *                 "authorizedPerson": string,
   *                 "positionTitle": string
   *              },
   *              "hr": {
   *                 "authorizedPerson": string,
   *                 "positionTitle": string
   *              }
   *           },
   *           "workPolicy": {
   *              "workDaysPerYear": number,
   *              "workHoursPerYear": number,
   *              "workMonthsPerYear": number,
   *              "workHoursStart": string,
   *              "workHoursEnd": string,
   *            	"nightShiftWorkHoursStart": string,
   *    	        "nightShiftWorkHoursEnd": string,
   *              "breakHours": string
   *           },
   *           "payrollComputation": {
   *              "periodsPerMonth": number,
   *              "statutoryPeriod": string,
   *              "absentDeductions": [
   *                 {
   *                    "incomeSource" : {
   *                       "name": string,
   *                       "isDeductible": boolean
   *                    },
   *                    "selected": boolean
   *                 }
   *              ],
   *              "lateDeductions": [
   *                 {
   *                    "incomeSource" : {
   *                       "name": string,
   *                       "isDeductible": boolean
   *                    },
   *                    "selected": boolean
   *                 }
   *              ],
   *              "overtimeComputation": {
   *                 "computationBasis": [
   *                    {
   *                       "incomeSource" : {
   *                          "name": string,
   *                          "isDeductible": boolean
   *                       },
   *                       "selected": boolean
   *                    }
   *                 ],
   *                 "rates": [
   *                    {
   *                        "overtimeRate" : {
   *                          "name": string,
   *                          "rate": number
   *                       },
   *                       "selected": boolean
   *                    }
   *                 ]
   *              },
   *              "restDays": [
   *                 {
   *                    "day": string,
   *                    "selected": boolean
   *                 }
   *              ],
   *              "newHireProratedComputation": {
   *                 "prorationMethod": string,
   *                 "proratedIncomeSource": [
   *                    {
   *                       "incomeSource" : {
   *                          "name": string,
   *                          "isDeductible": boolean
   *                       },
   *                       "selected": boolean
   *                    }
   *                 ]
   *              },
   *              "computation13thMonth": {
   *                 "computationType": string,
   *                 "deductAbsent": boolean,
   *                 "deductLateOrUndertime": boolean,
   *                 "computationIncomeSource": [
   *                    {
   *                       "incomeSource" : {
   *                          "name": string,
   *                          "isDeductible": boolean
   *                       },
   *                       "selected": boolean
   *                    }
   *                 ]
   *              },
   *              "finalPayComputation": {
   *                 "deductAbsent": boolean,
   *                 "deductLateOrUndertime": boolean,
   *                 "include13thMonthPay": boolean
   *              },
   *              "enableNetPayThreshold": boolean
   *           },
   *           "taxComputation": {
   *              "taxTable": {
   *                 "annualization": string,
   *                 "preAnnualizationMonth": number,
   *                 "include13thMonthPay": boolean
   *              },
   *              "nonTaxExemptionCeling": number,
   *              "deminimisExemptionCeling": number
   *           }
   *        }
   *    }
   */

  /**
   *  @apiDefine CompanyProfileRequestBody
   *  @apiParamExample {json} Request Body:
   *  {
   *    "companyLogoId": string,
   *    "companyName": string,
   *    "natureOfBusiness": string,
   *    "eSignatoryId": string,
   *    "passwordExpirationDays": number,
   *    "contact": {
   *    	"firstAddress": string,
   *    	"secondAddress": string,
   *    	"zipCode": string,
   *    	"rdo": string,
   *    	"emailAddress": string,
   *    	"phone": string,
   *    	"fax": string
   *    },
   *    "governmentNumbers": {
   *      	"sssNumber": string,
   *        "philHealthNumber": string,
   *        "TIN": string,
   *        "hdmfNumber": string
   *    },
   *    "signatories": {
   *    	"admin": {
   *    		"authorizedPerson": string,
   *    		"positionTitle": string
   *    	},
   *    	"finance": {
   *    		"authorizedPerson": string,
   *    		"positionTitle": string
   *    	},
   *    	"hr": {
   *    		"authorizedPerson": string,
   *    		"positionTitle": string
   *    	}
   *    },
   *    "workPolicy": {
   *    	"workDaysPerYear": number,
   *    	"workHoursPerYear": number,
   *    	"workMonthsPerYear": number,
   *    	"workHoursStart": string,
   *    	"workHoursEnd": string,
   *     	"nightShiftWorkHoursStart": string,
   *      "nightShiftWorkHoursEnd": string,
   *    	"breakHours": string
   *    },
   *    "payrollComputation": {
   *    	"periodsPerMonth": 1 | 2 | 4,
   *    	"statutoryPeriod": 'Regular' | 'Irregular',
   *    	"absentDeductions": [
   *    		{
   *    			"incomeSource" : string,
   *    			"selected": boolean
   *    		}
   *    	],
   *    	"lateDeductions": [
   *    		{
   *    			"incomeSource" : string,
   *    			"selected": boolean
   *    		}
   *    	],
   *    	"overtimeComputation": {
   *    		"computationBasis": [
   *    			{
   *    				"incomeSource" : string,
   *    				"selected": boolean
   *    			}
   *    		],
   *    		"rates": [
   *    			{
   *    				"overtimeRate": string,
   *    				"selected": boolean
   *    			}
   *    		]
   *    	},
   *    	"restDays": [
   *    		{
   *    			"day": 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun',
   *    			"selected": boolean
   *    		}
   *    	],
   *    	"newHireProratedComputation": {
   *    		"prorationMethod": 'daily_multiply_by_days_present' | 'salary_less_absent',
   *    		"proratedIncomeSource": [
   *    			{
   *    				"incomeSource" : string,
   *    				"selected": boolean
   *    			}
   *    		]
   *    	},
   *    	"computation13thMonth": {
   *    		"computationType": 'advance' | 'current_full_salary',
   *    		"deductAbsent": boolean,
   *    		"deductLateOrUndertime": boolean,
   *    		"computationIncomeSource": [
   *    			{
   *    				"incomeSource" : string,
   *    				"selected": boolean
   *    			}
   *    		]
   *    	},
   *    	"finalPayComputation": {
   *    		"deductAbsent": boolean,
   *    		"deductLateOrUndertime": boolean,
   *    		"include13thMonthPay": boolean
   *    	},
   *    	"enableNetPayThreshold": boolean
   *    },
   *    "taxComputation": {
   *    	"taxTable": {
   *    		"annualization": 'normal' | 'pre_annualized',
   *    		"preAnnualizationMonth": number,
   *    		"include13thMonthPay": boolean
   *    	},
   *    	"nonTaxExemptionCeling": number,
   *    	"deminimisExemptionCeling": number
   *    }
   *  }
   */

  /**
   * @api {get} /company/:id Get By Id
   * @apiParam {Number} id Company's unique Id
   *
   * @apiVersion 1.0.0
   * @apiName Company Fetch
   * @apiGroup Company
   *
   * @apiUse CompanyProfileSuccessResponse
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   *
   */

  /**
   * @api {get} /company/list Get List
   * @apiVersion 1.0.0
   * @apiName Company Fetch List
   * @apiGroup Company
   *
   * @apiUse PagingParams
   * @apiUse AuthHeader
   * @apiUse ResponseDto
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
   * @api {post} /company Create
   * @apiVersion 1.0.0
   * @apiName Company Save
   * @apiGroup Company
   *
   * @apiUse CompanyProfileRequestBody
   * @apiUse UserIdNotFoundError
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   *
   * @apiUse CompanyProfileSuccessResponse
   * @apiParam {json} content Created Company Details
   *
   */

  /**
   * @api {put} /company/:id Update
   * @apiParam {Number} id Company's unique Id to be Updated
   * @apiVersion 1.0.0
   * @apiName Company Update
   * @apiGroup Company
   *
   * @apiUse CompanyProfileRequestBody
   * @apiUse UserIdNotFoundError
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   *
   * @apiUse CompanyProfileSuccessResponse
   * @apiParam {json} content Updated Company Details
   *
   */

  /**
   * @api {delete} /company/:id Delete
   * @apiParam {Number} id Company's unique Id to be Deleted
   * @apiVersion 1.0.0
   * @apiName Company Remove
   * @apiGroup Company
   *
   * @apiUse UserIdNotFoundError
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   *
   * @apiUse CompanyProfileSuccessResponse
   * @apiParam {json} content Updated Company Details
   *
   */

  // @Put(':id')
  // @Action(ActionType.UPDATE)
  // async updateCompany(
  //   @Req() request: any,
  //   @Param('id') id: string,
  //   @Body() company: DeepPartial<CompanyEntity>
  // ) {
  //   const updatedEntity = await super.update(request, id, company);

  //   return new ResponseDTO('Updated Succesfully', updatedEntity, HttpStatus.OK);
  // }
}
