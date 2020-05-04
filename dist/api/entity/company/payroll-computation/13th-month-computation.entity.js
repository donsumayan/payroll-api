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
const _13th_month_computation_type_1 = require("../../../constant/13th-month-computation-type");
const base_entity_1 = require("../../base.entity");
const _13th_month_computation_income_src_entity_1 = require("./13th-month-computation-income-src.entity");
const payroll_computation_entity_1 = require("./payroll-computation.entity");
let Company13thMonthComputationEntity = class Company13thMonthComputationEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({
        name: 'COMPUTATION_TYPE',
        type: 'enum',
        enum: _13th_month_computation_type_1._13THMonthComputationType,
        default: _13th_month_computation_type_1._13THMonthComputationType.YEAR_TO_DATE,
    }),
    __metadata("design:type", String)
], Company13thMonthComputationEntity.prototype, "computationType", void 0);
__decorate([
    typeorm_1.Column({ name: 'DEDUCT_ABSENT', default: 0 }),
    __metadata("design:type", Boolean)
], Company13thMonthComputationEntity.prototype, "deductAbsent", void 0);
__decorate([
    typeorm_1.Column({ name: 'DEDUCT_LATE_OR_UNDERTIME', default: 0 }),
    __metadata("design:type", Boolean)
], Company13thMonthComputationEntity.prototype, "deductLateOrUndertime", void 0);
__decorate([
    typeorm_1.OneToMany(() => _13th_month_computation_income_src_entity_1.Company13thMonthComputationIncomeSourceEntity, computationIncomeSource => computationIncomeSource.company13thMonthComputation, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Company13thMonthComputationEntity.prototype, "computationIncomeSource", void 0);
__decorate([
    typeorm_1.OneToOne(() => payroll_computation_entity_1.PayrollComputationEntity, payrollComputation => payrollComputation.id),
    typeorm_1.JoinColumn({ name: 'PAYROLL_COMPUTATION_ID' }),
    __metadata("design:type", payroll_computation_entity_1.PayrollComputationEntity)
], Company13thMonthComputationEntity.prototype, "payrollComputation", void 0);
Company13thMonthComputationEntity = __decorate([
    typeorm_1.Entity('COMPANY_13TH_MONTH_COMPUTATION')
], Company13thMonthComputationEntity);
exports.Company13thMonthComputationEntity = Company13thMonthComputationEntity;
//# sourceMappingURL=13th-month-computation.entity.js.map