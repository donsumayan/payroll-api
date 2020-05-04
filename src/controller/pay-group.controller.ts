import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ACCESS } from '../constant/api-features';
import { Feature } from '../decorators/action.decorators';
import { PayGroupEntity } from '../entity/pay-group.entity';
import { RolesGuard } from '../guards/roles.guard';
import { PayGroupService } from '../service/pay-group.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Feature(ACCESS.PAYGROUPS)
@Controller('pay-group')
export class PayGroupController extends BaseController<PayGroupEntity> {
  constructor(readonly service: PayGroupService) {
    super(service);
  }

  /**
   * @api {get} pay-group/:id Get by ID
   * @apiGroup Pay Group
   * @apiDescription Get Paygroup
   * @apiVersion 1.0.0
   *
   * @apiUse AuthHeader
   */

  /**
   * @api {delete} pay-group/:id Delete
   * @apiGroup Pay Group
   * @apiDescription Delete Paygroup
   * @apiVersion 1.0.0
   *
   */

  /**
   * @api {get} pay-group/list Get list
   * @apiGroup Pay Group
   * @apiDescription Get Paygroups list
   * @apiVersion 1.0.0
   *
   * @apiUse AuthHeader
   */

  /**
   * @api {post} pay-group/list Create
   * @apiGroup Pay Group
   * @apiDescription Create paygroup
   * @apiVersion 1.0.0
   *
   * @apiUse AuthHeader
   *
   * @apiParamExample {json} RequestBody
   *{
   *  "name": "Test Paygroup",
   *  "description": "Test paygroup creation"
   *}
   *
   */

  /**
   * @api {put} pay-group/:id Update
   * @apiGroup Pay Group
   * @apiDescription Update paygroup
   * @apiVersion 1.0.0
   *
   * @apiUse AuthHeader
   *
   * @apiParamExample {json}  Request Body
   *{
   *     "id": "28abc307-731d-4704-a4ea-5a7a8b8c3f55",
   *     "name": "Paygroup 1",
   *     "description": "Test paygroup 1"
   * }
   */

  /**
   * @api {post} pay-group/import Import
   * @apiGroup Pay Group
   * @apiDescription Create paygroup
   * @apiVersion 1.0.0
   *
   * @apiUse AuthHeader
   *
   * @apiParam {PayGroup[]} list of Paygroup
   *
   */
}
