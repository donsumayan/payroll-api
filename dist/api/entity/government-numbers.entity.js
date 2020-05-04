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
class GovernmentNumbersEntity extends base_entity_1.BaseEntity {
}
__decorate([
    typeorm_1.Column({ name: 'SSS_NUMBER', nullable: true }),
    __metadata("design:type", String)
], GovernmentNumbersEntity.prototype, "sssNumber", void 0);
__decorate([
    typeorm_1.Column({ name: 'PHILHEALTH_NUMBER', nullable: true }),
    __metadata("design:type", String)
], GovernmentNumbersEntity.prototype, "philHealthNumber", void 0);
__decorate([
    typeorm_1.Column({ name: 'TIN', nullable: true }),
    __metadata("design:type", String)
], GovernmentNumbersEntity.prototype, "TIN", void 0);
__decorate([
    typeorm_1.Column({ name: 'HDMF_NUMBER', nullable: true }),
    __metadata("design:type", String)
], GovernmentNumbersEntity.prototype, "hdmfNumber", void 0);
exports.GovernmentNumbersEntity = GovernmentNumbersEntity;
//# sourceMappingURL=government-numbers.entity.js.map