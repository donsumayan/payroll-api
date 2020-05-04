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
const payroll_computation_entity_1 = require("./payroll-computation.entity");
let FinalPayComputationEntity = class FinalPayComputationEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'DEDUCT_ABSENT', default: 0, nullable: true }),
    __metadata("design:type", Boolean)
], FinalPayComputationEntity.prototype, "deductAbsent", void 0);
__decorate([
    typeorm_1.Column({ name: 'DEDUCT_LATE_OR_UNDERTIME', default: 0, nullable: true }),
    __metadata("design:type", Boolean)
], FinalPayComputationEntity.prototype, "deductLateOrUndertime", void 0);
__decorate([
    typeorm_1.Column({ name: 'INCLUDE_13TH_MONTH_PAY', default: 0, nullable: true }),
    __metadata("design:type", Boolean)
], FinalPayComputationEntity.prototype, "include13thMonthPay", void 0);
__decorate([
    typeorm_1.OneToOne(() => payroll_computation_entity_1.PayrollComputationEntity, payrollComputation => payrollComputation.id),
    typeorm_1.JoinColumn({ name: 'PAYROLL_COMPUTATION_ID' }),
    __metadata("design:type", payroll_computation_entity_1.PayrollComputationEntity)
], FinalPayComputationEntity.prototype, "payrollComputation", void 0);
FinalPayComputationEntity = __decorate([
    typeorm_1.Entity('FINAL_PAY_COMPUTATION')
], FinalPayComputationEntity);
exports.FinalPayComputationEntity = FinalPayComputationEntity;
//# sourceMappingURL=final-pay-computation.entity.js.map