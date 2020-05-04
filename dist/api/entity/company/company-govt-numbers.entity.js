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
const government_numbers_entity_1 = require("../government-numbers.entity");
const company_entity_1 = require("./company.entity");
let CompanyGovernmentNumbersEntity = class CompanyGovernmentNumbersEntity extends government_numbers_entity_1.GovernmentNumbersEntity {
};
__decorate([
    typeorm_1.OneToOne(() => company_entity_1.CompanyEntity, company => company.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'COMPANY_ID' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], CompanyGovernmentNumbersEntity.prototype, "company", void 0);
CompanyGovernmentNumbersEntity = __decorate([
    typeorm_1.Entity('COMPANY_GOVERNMENT_NUMBERS')
], CompanyGovernmentNumbersEntity);
exports.CompanyGovernmentNumbersEntity = CompanyGovernmentNumbersEntity;
//# sourceMappingURL=company-govt-numbers.entity.js.map