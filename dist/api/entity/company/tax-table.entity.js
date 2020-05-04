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
const tax_annualization_1 = require("../../constant/tax-annualization");
const base_entity_1 = require("../base.entity");
const tax_computation_entity_1 = require("./tax-computation.entity");
let TaxTableEntity = class TaxTableEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({
        name: 'ANNUALIZATION',
        type: 'enum',
        enum: tax_annualization_1.TaxAnnualization,
        default: tax_annualization_1.TaxAnnualization.NORMAL,
    }),
    __metadata("design:type", String)
], TaxTableEntity.prototype, "annualization", void 0);
__decorate([
    typeorm_1.Column({ name: 'PRE_ANNUALIZATION_MONTH', default: 1 }),
    __metadata("design:type", Number)
], TaxTableEntity.prototype, "preAnnualizationMonth", void 0);
__decorate([
    typeorm_1.Column({ name: 'INCLUDE_13TH_MONTH_PAY', default: 0 }),
    __metadata("design:type", Boolean)
], TaxTableEntity.prototype, "include13thMonthPay", void 0);
__decorate([
    typeorm_1.OneToOne(() => tax_computation_entity_1.TaxComputationEntity, taxComputation => taxComputation.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'TAX_COMPUTATION_ID' }),
    __metadata("design:type", tax_computation_entity_1.TaxComputationEntity)
], TaxTableEntity.prototype, "taxComputation", void 0);
TaxTableEntity = __decorate([
    typeorm_1.Entity('TAX_TABLE')
], TaxTableEntity);
exports.TaxTableEntity = TaxTableEntity;
//# sourceMappingURL=tax-table.entity.js.map