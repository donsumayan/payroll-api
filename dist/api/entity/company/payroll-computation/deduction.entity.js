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
const income_source_entity_1 = require("../income-source.entity");
const payroll_computation_entity_1 = require("./payroll-computation.entity");
class DeductionEntity extends base_entity_1.BaseEntity {
}
__decorate([
    typeorm_1.ManyToOne(() => payroll_computation_entity_1.PayrollComputationEntity, payrollComputation => payrollComputation.id),
    typeorm_1.JoinColumn({ name: 'PAYROLL_COMPUTATION_ID' }),
    __metadata("design:type", payroll_computation_entity_1.PayrollComputationEntity)
], DeductionEntity.prototype, "payrollComputation", void 0);
__decorate([
    typeorm_1.ManyToOne(() => income_source_entity_1.IncomeSourceEntity, incomeSource => incomeSource.id, { eager: true }),
    typeorm_1.JoinColumn({ name: 'INCOME_SOURCE_ID' }),
    __metadata("design:type", Object)
], DeductionEntity.prototype, "incomeSource", void 0);
__decorate([
    typeorm_1.Column({ name: 'IS_SELECTED', default: 0 }),
    __metadata("design:type", Boolean)
], DeductionEntity.prototype, "selected", void 0);
exports.DeductionEntity = DeductionEntity;
//# sourceMappingURL=deduction.entity.js.map