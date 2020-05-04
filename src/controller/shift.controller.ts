import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ACCESS } from '../constant/api-features';
import { Feature } from '../decorators/action.decorators';
import { ShiftEntity } from '../entity/shift.entity';
import { ShiftService } from '../service/shift.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'))
@Feature(ACCESS.SITES)
@Controller('shifts')
export class ShiftController extends BaseController<ShiftEntity> {
  constructor(readonly service: ShiftService) {
    super(service);
  }
}
