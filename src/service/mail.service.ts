import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';

import { MailConstants } from '../constant/mail';
import { MailDTO } from '../dto/mail.dto';

@Injectable()
export class MailService {
  nodemailer = require('nodemailer');
  htmlPDF = require('html-pdf');
  host = process.env.SMTP_HOST;
  port = process.env.SMTP_PORT;
  user = process.env.SMTP_USER;
  pass = process.env.SMTP_PASS;
  transporter;

  constructor() {
    this.transporter = this.nodemailer.createTransport({
      host: this.host,
      port: this.port,
      auth: { user: this.user, pass: this.pass },
    });
  }

  async send(mailOptions: MailDTO): Promise<any> {
    const mailOptionsValid = this.validate(mailOptions);
    if (mailOptionsValid) {
      const mailData = await this.constructMail(mailOptions);
      return this.transporter
        .sendMail(mailData)
        .then(data => {
          return {
            message: 'Email sent: ' + data.response,
            status: HttpStatus.OK,
          };
        })
        .catch(error => {
          return {
            message: 'Error: ' + error,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          };
        });
    }
  }

  private async constructMail(mailOptions: MailDTO) {
    const { from, html } = mailOptions;
    if (!from) {
      mailOptions.from = MailConstants.from;
    }

    const createPDF = (html, options) =>
      new Promise((resolve, reject) => {
        this.htmlPDF.create(html, options).toBuffer((err, buffer) => {
          if (err !== null) {
            reject(err);
          } else {
            resolve(buffer);
          }
        });
      });
    const PDF = await createPDF(html, {});
    const attachments = [
      {
        filename: 'payslip.pdf',
        content: PDF,
      },
    ];
    delete mailOptions.html;

    return { ...mailOptions, attachments };
  }

  private validate(mailOptions: MailDTO) {
    const { to } = mailOptions;
    if (!to) {
      throw new BadRequestException('Mail recipient is mandatory!');
    }
    return true;
  }
}
