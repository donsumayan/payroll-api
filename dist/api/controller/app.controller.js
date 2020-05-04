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
const moment = require("moment");
const response_dto_1 = require("../dto/response.dto");
let AppController = class AppController {
    constructor(httpService) {
        this.httpService = httpService;
    }
    ping() {
        return new response_dto_1.ResponseDTO('Success', 'Pong', 200);
    }
    async datetime() {
        const response = await this.httpService
            .get('http://worldtimeapi.org/api/timezone/Asia/Manila')
            .toPromise();
        const datetime = response.data.datetime || moment().toISOString(true);
        return new response_dto_1.ResponseDTO('Success', datetime, 200);
    }
};
__decorate([
    common_1.Get('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "ping", null);
__decorate([
    common_1.Get('datetime'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "datetime", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [common_1.HttpService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map