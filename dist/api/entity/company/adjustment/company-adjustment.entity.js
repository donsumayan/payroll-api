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
const base_entity_1 = require("../../base.entity");
const adjustment_type_entity_1 = require("./adjustment-type.entity");
let CompanyAdjustmentEntity = class CompanyAdjustmentEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'NAME' }),
    __metadata("design:type", String)
], CompanyAdjustmentEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'CODE' }),
    __metadata("design:type", String)
], CompanyAdjustmentEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ name: 'AMOUNT', type: 'double' }),
    __metadata("design:type", Number)
], CompanyAdjustmentEntity.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column({ name: 'APPLIED_BEFORE_TAX', default: 0 }),
    __metadata("design:type", Boolean)
], CompanyAdjustmentEntity.prototype, "appliedBeforeTax", void 0);
__decorate([
    typeorm_1.Column({ name: 'TAXABLE', default: 0 }),
    __metadata("design:type", Boolean)
], CompanyAdjustmentEntity.prototype, "taxable", void 0);
__decorate([
    typeorm_1.Column({ name: 'MAX_AMOUNT', type: 'double' }),
    __metadata("design:type", Number)
], CompanyAdjustmentEntity.prototype, "maxAmount", void 0);
__decorate([
    typeorm_1.Column({ name: 'REMARKS' }),
    __metadata("design:type", String)
], CompanyAdjustmentEntity.prototype, "remarks", void 0);
__decorate([
    typeorm_1.Column({ name: 'AMT_PROVIDED_PER_PERIOD', default: 0 }),
    __metadata("design:type", Boolean)
], CompanyAdjustmentEntity.prototype, "amtProvidedPerPeriod", void 0);
__decorate([
    typeorm_1.OneToOne(() => adjustment_type_entity_1.AdjustmentTypeEntity, type => type.id, { eager: true }),
    typeorm_1.JoinColumn({ name: 'ADJUSTMENT_TYPE_ID' }),
    __metadata("design:type", Object)
], CompanyAdjustmentEntity.prototype, "type", void 0);
CompanyAdjustmentEntity = __decorate([
    typeorm_1.Entity('COMPANY_ADJUSTMENT')
], CompanyAdjustmentEntity);
exports.CompanyAdjustmentEntity = CompanyAdjustmentEntity;
//# sourceMappingURL=company-adjustment.entity.js.map