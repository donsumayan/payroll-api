import { MailDTO } from '../dto/mail.dto';
import { ResponseDTO } from '../dto/response.dto';
import { MailService } from '../service/mail.service';
export declare class MailController {
    private mailService;
    constructor(mailService: MailService);
    mail(mailOptions: MailDTO): Promise<ResponseDTO<any>>;
}
