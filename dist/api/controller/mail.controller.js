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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mail_dto_1 = require("../dto/mail.dto");
const response_dto_1 = require("../dto/response.dto");
const mail_service_1 = require("../service/mail.service");
let MailController = class MailController {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async mail(mailOptions) {
        const mailResponse = await this.mailService.send(mailOptions);
        const { message, content, status } = mailResponse;
        return new response_dto_1.ResponseDTO(message, content, status);
    }
};
__decorate([
    common_1.Post('send'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mail_dto_1.MailDTO]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "mail", null);
MailController = __decorate([
    common_1.Controller('mail'),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailController);
exports.MailController = MailController;
//# sourceMappingURL=mail.controller.js.map