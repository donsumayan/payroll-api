import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ACCESS } from '../constant/api-features';
import { Feature } from '../decorators/action.decorators';
import { User } from '../decorators/user.decorator';
import { ResponseDTO } from '../dto/response.dto';
import { UserEntity } from '../entity/user.entity';
import { RolesGuard } from '../guards/roles.guard';
import { UserService } from '../service/user.service';
import { BaseController } from './base.controller';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Feature(ACCESS.USERS)
@Controller('user')
export class UserController extends BaseController<UserEntity> {
  constructor(readonly service: UserService) {
    super(service);
  }

  @Post()
  async create(@Body() body: UserEntity, @User() user: UserEntity) {
    const createdUser = await this.service.create({
      ...body,
      companyId: user.companyId,
      createBy: user.id,
    });

    return new ResponseDTO(
      'Saved Succesfully',
      createdUser,
      HttpStatus.CREATED
    );
  }

  /**
   * @api {get} /user/validate/username/:username
   * @apiVersion 1.0.0
   * @apiName Validate Employee ID
   * @apiGroup User
   */
  @Get('validate/username/:username')
  async validateEmployeeId(@Param('username') username: string) {
    const user = await this.service.userRepository.findOne({
      where: { username },
    });

    if (user) {
      throw new BadRequestException('Username is already taken');
    }

    return new ResponseDTO('Success', { valid: !user }, 200);
  }

  @Put('password')
  async updatePassword(@Body() body: UserEntity) {
    const user = await this.service.updatePassword(body);
    return new ResponseDTO('Success', user, 200);
  }
}
