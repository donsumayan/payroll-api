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
const proration_method_1 = require("../../../constant/proration-method");
const base_entity_1 = require("../../base.entity");
const new_hire_prorated_income_src_entity_1 = require("./new-hire-prorated-income-src.entity");
const payroll_computation_entity_1 = require("./payroll-computation.entity");
let NewHireProratedComputationEntity = class NewHireProratedComputationEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({
        name: 'PRORATION_METHOD',
        type: 'enum',
        enum: proration_method_1.ProrationMethod,
        default: proration_method_1.ProrationMethod.MULTIPLE_BY_DAYS_PRESENT,
    }),
    __metadata("design:type", String)
], NewHireProratedComputationEntity.prototype, "prorationMethod", void 0);
__decorate([
    typeorm_1.OneToMany(() => new_hire_prorated_income_src_entity_1.NewHireProratedIncomeSourceEntity, proratedIncomeSource => proratedIncomeSource.newHireProratedComputation, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], NewHireProratedComputationEntity.prototype, "proratedIncomeSource", void 0);
__decorate([
    typeorm_1.OneToOne(() => payroll_computation_entity_1.PayrollComputationEntity, payrollComputation => payrollComputation.id),
    typeorm_1.JoinColumn({ name: 'PAYROLL_COMPUTATION_ID' }),
    __metadata("design:type", payroll_computation_entity_1.PayrollComputationEntity)
], NewHireProratedComputationEntity.prototype, "payrollComputation", void 0);
NewHireProratedComputationEntity = __decorate([
    typeorm_1.Entity('NEW_HIRE_PRORATED_COMPUTATION')
], NewHireProratedComputationEntity);
exports.NewHireProratedComputationEntity = NewHireProratedComputationEntity;
//# sourceMappingURL=new-hire-prorated-computation.entity.js.map