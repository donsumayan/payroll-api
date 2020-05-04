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
const statutory_period_sched_1 = require("../../../constant/statutory-period-sched");
const company_entity_1 = require("../company.entity");
const _13th_month_computation_entity_1 = require("./13th-month-computation.entity");
const absent_deduction_entity_1 = require("./absent-deduction.entity");
const final_pay_computation_entity_1 = require("./final-pay-computation.entity");
const late_deduction_entity_1 = require("./late-deduction.entity");
const new_hire_prorated_computation_entity_1 = require("./new-hire-prorated-computation.entity");
const overtime_computation_entity_1 = require("./overtime-computation.entity");
let PayrollComputationEntity = class PayrollComputationEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid', { name: 'ID' }),
    __metadata("design:type", String)
], PayrollComputationEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'PERIOD_PER_MONTH', nullable: true }),
    __metadata("design:type", Number)
], PayrollComputationEntity.prototype, "periodsPerMonth", void 0);
__decorate([
    typeorm_1.Column({
        name: 'STATUTORY_PERIOD',
        type: 'enum',
        enum: statutory_period_sched_1.StatutoryPeriodSchedule,
        default: statutory_period_sched_1.StatutoryPeriodSchedule.REGULAR,
        nullable: true,
    }),
    __metadata("design:type", String)
], PayrollComputationEntity.prototype, "statutoryPeriod", void 0);
__decorate([
    typeorm_1.OneToMany(() => absent_deduction_entity_1.AbsentDeductionEntity, absentDeduction => absentDeduction.payrollComputation, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], PayrollComputationEntity.prototype, "absentDeductions", void 0);
__decorate([
    typeorm_1.OneToMany(() => late_deduction_entity_1.LateDeductionEntity, lateDeduction => lateDeduction.payrollComputation, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], PayrollComputationEntity.prototype, "lateDeductions", void 0);
__decorate([
    typeorm_1.OneToOne(() => overtime_computation_entity_1.OvertimeComputationEntity, overtimeComputation => overtimeComputation.payrollComputation, { cascade: true, eager: true }),
    __metadata("design:type", overtime_computation_entity_1.OvertimeComputationEntity)
], PayrollComputationEntity.prototype, "overtimeComputation", void 0);
__decorate([
    typeorm_1.OneToOne(() => new_hire_prorated_computation_entity_1.NewHireProratedComputationEntity, newHireProratedComputation => newHireProratedComputation.payrollComputation, { cascade: true, eager: true }),
    __metadata("design:type", new_hire_prorated_computation_entity_1.NewHireProratedComputationEntity)
], PayrollComputationEntity.prototype, "newHireProratedComputation", void 0);
__decorate([
    typeorm_1.OneToOne(() => _13th_month_computation_entity_1.Company13thMonthComputationEntity, computation13thMonth => computation13thMonth.payrollComputation, { cascade: true, eager: true }),
    __metadata("design:type", _13th_month_computation_entity_1.Company13thMonthComputationEntity)
], PayrollComputationEntity.prototype, "computation13thMonth", void 0);
__decorate([
    typeorm_1.OneToOne(() => final_pay_computation_entity_1.FinalPayComputationEntity, finalPayComputation => finalPayComputation.payrollComputation, { cascade: true, eager: true }),
    __metadata("design:type", final_pay_computation_entity_1.FinalPayComputationEntity)
], PayrollComputationEntity.prototype, "finalPayComputation", void 0);
__decorate([
    typeorm_1.Column({ name: 'ENABLE_NET_PAY_THRESHOLD', default: 0 }),
    __metadata("design:type", Boolean)
], PayrollComputationEntity.prototype, "enableNetPayThreshold", void 0);
__decorate([
    typeorm_1.OneToOne(() => company_entity_1.CompanyEntity, company => company.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'COMPANY_ID' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], PayrollComputationEntity.prototype, "company", void 0);
PayrollComputationEntity = __decorate([
    typeorm_1.Entity('PAYROLL_COMPUTATION')
], PayrollComputationEntity);
exports.PayrollComputationEntity = PayrollComputationEntity;
//# sourceMappingURL=payroll-computation.entity.js.map