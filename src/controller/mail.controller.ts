import { Body, Controller, Post } from '@nestjs/common';

import { MailDTO } from '../dto/mail.dto';
import { ResponseDTO } from '../dto/response.dto';
import { MailService } from '../service/mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('send')
  async mail(@Body() mailOptions: MailDTO) {
    const mailResponse = await this.mailService.send(mailOptions);
    const { message, content, status } = mailResponse;
    return new ResponseDTO(message, content, status);
  }
}
