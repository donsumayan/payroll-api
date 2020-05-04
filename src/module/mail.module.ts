import { Module } from '@nestjs/common';

import { MailController } from '../controller/mail.controller';
import { MailService } from '../service/mail.service';

@Module({
  imports: [],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
