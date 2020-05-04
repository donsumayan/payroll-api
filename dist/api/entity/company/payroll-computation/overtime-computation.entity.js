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
const overtime_computation_basis_entity_1 = require("./overtime-computation-basis.entity");
const overtime_computation_rates_entity_1 = require("./overtime-computation-rates.entity");
const payroll_computation_entity_1 = require("./payroll-computation.entity");
let OvertimeComputationEntity = class OvertimeComputationEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.OneToOne(() => payroll_computation_entity_1.PayrollComputationEntity, payrollComputation => payrollComputation.id),
    typeorm_1.JoinColumn({ name: 'PAYROLL_COMPUTATION_ID' }),
    __metadata("design:type", payroll_computation_entity_1.PayrollComputationEntity)
], OvertimeComputationEntity.prototype, "payrollComputation", void 0);
__decorate([
    typeorm_1.OneToMany(() => overtime_computation_basis_entity_1.OvertimeComputationBasisEntity, overTimeComputationBasis => overTimeComputationBasis.overtimeComputation, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], OvertimeComputationEntity.prototype, "computationBasis", void 0);
__decorate([
    typeorm_1.OneToMany(() => overtime_computation_rates_entity_1.OvertimeComputationRateEntity, overTimeComputationRates => overTimeComputationRates.overtimeComputation, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], OvertimeComputationEntity.prototype, "rates", void 0);
OvertimeComputationEntity = __decorate([
    typeorm_1.Entity('OVERTIME_COMPUTATION')
], OvertimeComputationEntity);
exports.OvertimeComputationEntity = OvertimeComputationEntity;
//# sourceMappingURL=overtime-computation.entity.js.map