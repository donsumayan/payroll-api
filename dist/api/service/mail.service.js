"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mail_1 = require("../constant/mail");
let MailService = class MailService {
    constructor() {
        this.nodemailer = require('nodemailer');
        this.htmlPDF = require('html-pdf');
        this.host = process.env.SMTP_HOST;
        this.port = process.env.SMTP_PORT;
        this.user = process.env.SMTP_USER;
        this.pass = process.env.SMTP_PASS;
        this.transporter = this.nodemailer.createTransport({
            host: this.host,
            port: this.port,
            auth: { user: this.user, pass: this.pass },
        });
    }
    async send(mailOptions) {
        const mailOptionsValid = this.validate(mailOptions);
        if (mailOptionsValid) {
            const mailData = await this.constructMail(mailOptions);
            return this.transporter
                .sendMail(mailData)
                .then(data => {
                return {
                    message: 'Email sent: ' + data.response,
                    status: common_1.HttpStatus.OK,
                };
            })
                .catch(error => {
                return {
                    message: 'Error: ' + error,
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                };
            });
        }
    }
    async constructMail(mailOptions) {
        const { from, html } = mailOptions;
        if (!from) {
            mailOptions.from = mail_1.MailConstants.from;
        }
        const createPDF = (html, options) => new Promise((resolve, reject) => {
            this.htmlPDF.create(html, options).toBuffer((err, buffer) => {
                if (err !== null) {
                    reject(err);
                }
                else {
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
        return Object.assign(Object.assign({}, mailOptions), { attachments });
    }
    validate(mailOptions) {
        const { to } = mailOptions;
        if (!to) {
            throw new common_1.BadRequestException('Mail recipient is mandatory!');
        }
        return true;
    }
};
MailService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map