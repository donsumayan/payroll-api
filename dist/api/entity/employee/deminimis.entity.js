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
const base_entity_1 = require("../base.entity");
const salary_details_entity_1 = require("./salary-details.entity");
let DeMinimisBenefitEntity = class DeMinimisBenefitEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'AMOUNT', type: 'float' }),
    __metadata("design:type", Number)
], DeMinimisBenefitEntity.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column({ name: 'TYPE' }),
    __metadata("design:type", String)
], DeMinimisBenefitEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(() => salary_details_entity_1.SalaryDetailsEntity, sde => sde.id, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: 'SALARY_DETAILS_ID' }),
    __metadata("design:type", salary_details_entity_1.SalaryDetailsEntity)
], DeMinimisBenefitEntity.prototype, "salaryEntity", void 0);
DeMinimisBenefitEntity = __decorate([
    typeorm_1.Entity('DE_MINIMIS_BENEFITS')
], DeMinimisBenefitEntity);
exports.DeMinimisBenefitEntity = DeMinimisBenefitEntity;
//# sourceMappingURL=deminimis.entity.js.map