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
const company_entity_1 = require("./company.entity");
let TaxComputationEntity = class TaxComputationEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid', { name: 'ID' }),
    __metadata("design:type", String)
], TaxComputationEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'NON_TAX_EXEMPTION_CEILING', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], TaxComputationEntity.prototype, "nonTaxExemptionCeling", void 0);
__decorate([
    typeorm_1.Column({ name: 'IS_PRE_ANNUALIZED', nullable: true }),
    __metadata("design:type", String)
], TaxComputationEntity.prototype, "isPreAnnualized", void 0);
__decorate([
    typeorm_1.Column({ name: 'PRE_ANNUALIZATION_START', nullable: true }),
    __metadata("design:type", String)
], TaxComputationEntity.prototype, "preAnnualizationStart", void 0);
__decorate([
    typeorm_1.Column({ name: 'IS_13TH_MONTH_INCLUDED', nullable: true }),
    __metadata("design:type", Boolean)
], TaxComputationEntity.prototype, "is13thMonthIncluded", void 0);
__decorate([
    typeorm_1.Column({ name: 'DEMINIMIS_EXEMPTION_CEILING', nullable: true }),
    __metadata("design:type", Number)
], TaxComputationEntity.prototype, "deminimisExemptionCeling", void 0);
__decorate([
    typeorm_1.OneToOne(() => company_entity_1.CompanyEntity, company => company.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'COMPANY_ID' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], TaxComputationEntity.prototype, "company", void 0);
TaxComputationEntity = __decorate([
    typeorm_1.Entity('TAX_COMPUTATION')
], TaxComputationEntity);
exports.TaxComputationEntity = TaxComputationEntity;
//# sourceMappingURL=tax-computation.entity.js.map