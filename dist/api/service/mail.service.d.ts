import { MailDTO } from '../dto/mail.dto';
export declare class MailService {
    nodemailer: any;
    htmlPDF: any;
    host: any;
    port: any;
    user: any;
    pass: any;
    transporter: any;
    constructor();
    send(mailOptions: MailDTO): Promise<any>;
    private constructMail;
    private validate;
}
