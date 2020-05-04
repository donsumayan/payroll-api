import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { ResponseDTO } from '../dto/response.dto';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  /**
   * @api {post} auth/login Login
   * @apiGroup Authentication
   * @apiDescription Username and Password Authentication
   * @apiVersion 1.0.0
   *
   * @apiUse ResponseDto
   *
   * @apiParam {string} username Username
   * @apiParam {string} password Password
   * @apiParamExample {json} Req Body
   * {
   *    "username": "username1",
   *    "password": "password1"
   * }
   *
   * @apiSuccessExample {json} Response Body
   * HTTP/1.1 200 OK
   * {
   *     "message": "Success",
   *     "content": {
   *         "token": "jwtToken",
   *         "id": "1e8a8665-627c-462f-8061-b2961ee20366",
   *         "createBy": "0",
   *         "createTime": "2019-12-27T15:34:50.628Z",
   *         "updateBy": null,
   *         "username": "donsumayan3",
   *         "details": null
   *     },
   *     "status": 200
   * }
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    const user = await this.authService.login(req.user);

    return new ResponseDTO('Success', user, 200);
  }

  /**
   * @api {get} auth/profile Profile
   * @apiGroup Authentication
   * @apiDescription Get current user
   * @apiVersion 1.0.0
   *
   * @apiUse AuthHeader
   *
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req) {
    const id = req.user.id;
    const user = await this.userService.get(id);

    return new ResponseDTO('Success', user, 200);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token');

    const response = new ResponseDTO(
      'Success',
      'You have been logged out',
      200
    );

    res.json(response);
  }
}
