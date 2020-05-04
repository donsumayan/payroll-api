import { MailDTO } from '../dto/mail.dto';
export declare class MailService {
    nodemailer: any;
    htmlPDF: any;
    host: string;
    port: string;
    user: string;
    pass: string;
    transporter: any;
    constructor();
    send(mailOptions: MailDTO): Promise<any>;
    private constructMail;
    private validate;
}
