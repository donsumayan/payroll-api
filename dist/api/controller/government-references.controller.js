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
const passport_1 = require("@nestjs/passport");
const response_dto_1 = require("../dto/response.dto");
const government_references_service_1 = require("../service/government-references.service");
let GovernmentReferencesController = class GovernmentReferencesController {
    constructor(service) {
        this.service = service;
    }
    getTaxTables() {
        const tables = this.service.getTaxTable();
        return new response_dto_1.ResponseDTO('Success', tables, 200);
    }
    PHICContributionTable() {
        const table = this.service.getPHICTable();
        return new response_dto_1.ResponseDTO('Success', table, 200);
    }
    getSSSContributionTable() {
        const table = this.service.getSSSTable();
        return new response_dto_1.ResponseDTO('Success', table, 200);
    }
    getHdmfContributionTable() {
        const table = this.service.getHdmfContributionTable();
        return new response_dto_1.ResponseDTO('Success', table, 200);
    }
    calculateContributions(basicSalary) {
        const contributions = this.service.calculateContributions(basicSalary);
        return new response_dto_1.ResponseDTO('Success', contributions, 200);
    }
};
__decorate([
    common_1.Get('/withholding-tax-tables'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GovernmentReferencesController.prototype, "getTaxTables", null);
__decorate([
    common_1.Get('/phic-contribution-table'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GovernmentReferencesController.prototype, "PHICContributionTable", null);
__decorate([
    common_1.Get('/sss-contribution-table'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GovernmentReferencesController.prototype, "getSSSContributionTable", null);
__decorate([
    common_1.Get('/hdmf-contribution-table'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GovernmentReferencesController.prototype, "getHdmfContributionTable", null);
__decorate([
    common_1.Post('/calculate-contributions'),
    __param(0, common_1.Body('basicSalary')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GovernmentReferencesController.prototype, "calculateContributions", null);
GovernmentReferencesController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Controller('government-references'),
    __metadata("design:paramtypes", [government_references_service_1.GovernmentReferenceService])
], GovernmentReferencesController);
exports.GovernmentReferencesController = GovernmentReferencesController;
//# sourceMappingURL=government-references.controller.js.map