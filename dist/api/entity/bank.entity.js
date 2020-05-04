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
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
let BankEntity = class BankEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'NAME' }),
    __metadata("design:type", String)
], BankEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'CODE' }),
    __metadata("design:type", String)
], BankEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ name: 'ACCT_NUMBER' }),
    __metadata("design:type", String)
], BankEntity.prototype, "accountNumber", void 0);
__decorate([
    typeorm_1.Column({ name: 'COMPANY_CODE' }),
    __metadata("design:type", String)
], BankEntity.prototype, "companyCode", void 0);
__decorate([
    typeorm_1.Column({ name: 'PRESENTING_OFFICE' }),
    __metadata("design:type", String)
], BankEntity.prototype, "presentingOffice", void 0);
__decorate([
    typeorm_1.Column({ name: 'BRANCH_CODE' }),
    __metadata("design:type", String)
], BankEntity.prototype, "branchCode", void 0);
__decorate([
    typeorm_1.Column({ name: 'REMARKS' }),
    __metadata("design:type", String)
], BankEntity.prototype, "remarks", void 0);
BankEntity = __decorate([
    typeorm_1.Entity('BANK')
], BankEntity);
exports.BankEntity = BankEntity;
//# sourceMappingURL=bank.entity.js.map