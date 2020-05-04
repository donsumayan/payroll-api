import { Controller, Get, HttpService } from '@nestjs/common';
import * as moment from 'moment';

import { ResponseDTO } from '../dto/response.dto';

@Controller()
export class AppController {
  constructor(private httpService: HttpService) {}
  /**
   * @api {get} ping Ping
   * @apiDescription Ping server
   * @apiVersion 1.0.0
   * @apiGroup app
   * @apiUse ResponseDto
   * @apiSuccess {string} content Returns 'Pong'
   */
  @Get('ping')
  ping() {
    return new ResponseDTO('Success', 'Pong', 200);
  }

  /**
   * @api {get} datetime Get server date & time
   * @apiDescription Used to get server datetime
   * @apiVersion 1.0.0
   * @apiGroup app
   *
   * @apiSuccess {string} message Success Message.
   * @apiSuccess {number} status Sucess Status code.
   * @apiSuccess {string} content Returns Date ISO string.
   *
   */
  @Get('datetime')
  async datetime() {
    const response = await this.httpService
      .get('http://worldtimeapi.org/api/timezone/Asia/Manila')
      .toPromise();

    const datetime = response.data.datetime || moment().toISOString(true);

    return new ResponseDTO('Success', datetime, 200);
  }
}
