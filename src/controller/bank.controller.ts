import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ACCESS } from '../constant/api-features';
import { Feature } from '../decorators/action.decorators';
import { BankEntity } from '../entity/bank.entity';
import { BankService } from '../service/bank.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Feature(ACCESS.BANKS)
@Controller('bank')
export class BankController extends BaseController<BankEntity> {
  constructor(readonly bankService: BankService) {
    super(bankService);
  }

  /**
   * @api {get} bank/:id Get By Id
   * @apiVersion 1.0.0
   * @apiGroup Bank
   *
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   *
   * @apiSuccess {Bank} content Bank Details.
   *
   */

  /**
   * @api {get} bank/list Get list
   * @apiVersion 1.0.0
   * @apiGroup Bank
   *
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   * @apiUse PagingParams
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
   * @api {post} bank/ Create
   * @apiVersion 1.0.0
   * @apiGroup Bank
   *
   * @apiUse AuthHeader
   * @apiUse UserIdNotFoundError
   * @apiUse ResponseDto
   *
   * @apiParamExample {json} Request Body:
   * {
   *    "name": "Bank1";
   *    "code": "B1";
   *    "accountNumber": "0011223344";
   *    "companyCode": "B01";
   *    "presentingOffice": "Office 1";
   *    "branchCode": "OF1";
   *    "remarks": "anything goes here";
   * }
   *
   * @apiSuccess {json} content Bank Details.
   */

  /**
   * @api {put} bank/:id Update
   * @apiVersion 1.0.0
   * @apiGroup Bank
   *
   * @apiUse UserIdNotFoundError
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   *
   * @apiParam {number} id Id of bank to be updated
   * @apiParamExample {BankModel} Request Body:
   * {
   *    "name": "Bank1";
   *    "code": "B1";
   *    "accountNumber": "0011223344";
   *    "companyCode": "B01";
   *    "presentingOffice": "Office 1";
   *    "branchCode": "OF1";
   *    "remarks": "anything goes here";
   * }
   *
   * @apiSuccess {BankModel} content Bank Details.
   */

  /**
   * @api {delete} bank/:id Delete
   * @apiVersion 1.0.0
   * @apiGroup Bank
   *
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   * @apiUse UserIdNotFoundError
   *
   * @apiSuccess {BankModel} content Deleted Bank Details.
   */

  /**
   * @api {post} bank/import import
   * @apiVersion 1.0.0
   * @apiGroup Bank
   *
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   * @apiUse UserIdNotFoundError
   *
   * @apiParamExample {json} Request Body:
   * [
   *  {
   *    "name": "Bank1";
   *    "code": "B1";
   *    "accountNumber": "0011223344";
   *    "companyCode": "B01";
   *    "presentingOffice": "Office 1";
   *    "branchCode": "OF1";
   *    "remarks": "anything goes here";
   *  }
   * ]
   *
   * @apiSuccess {BankModel[]} content Created Bank Details.
   */
}
