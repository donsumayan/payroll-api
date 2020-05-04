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
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const deduction_type_1 = require("../constant/deduction-type");
const base_entity_1 = require("./base.entity");
const employee_entity_1 = require("./employee/employee.entity");
let PayrollRunsEntity = class PayrollRunsEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], PayrollRunsEntity.prototype, "transactionDate", void 0);
__decorate([
    typeorm_1.Column({ name: 'DATE_FROM' }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], PayrollRunsEntity.prototype, "dateFrom", void 0);
__decorate([
    typeorm_1.Column({ name: 'DATE_TO' }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], PayrollRunsEntity.prototype, "dateTo", void 0);
__decorate([
    typeorm_1.Column({ name: 'STATUS', default: 'PENDING_APPROVAL' }),
    __metadata("design:type", String)
], PayrollRunsEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.ManyToMany(() => employee_entity_1.EmployeeEntity, emp => emp.id, { eager: true }),
    typeorm_1.JoinTable({ name: 'PAYROLL_EMPLOYEES' }),
    __metadata("design:type", Array)
], PayrollRunsEntity.prototype, "employees", void 0);
__decorate([
    typeorm_1.Column({
        name: 'COMPUTE_DE_MINIMIS',
        type: 'enum',
        enum: deduction_type_1.DeductionType,
        default: deduction_type_1.DeductionType.FULL,
    }),
    __metadata("design:type", String)
], PayrollRunsEntity.prototype, "computeDeMinimis", void 0);
__decorate([
    typeorm_1.Column({
        name: 'COMPUTE_HDMF',
        type: 'enum',
        enum: deduction_type_1.DeductionType,
        default: deduction_type_1.DeductionType.FULL,
    }),
    __metadata("design:type", String)
], PayrollRunsEntity.prototype, "computeHDMF", void 0);
__decorate([
    typeorm_1.Column({
        name: 'COMPUTE_PHIC',
        type: 'enum',
        enum: deduction_type_1.DeductionType,
        default: deduction_type_1.DeductionType.FULL,
    }),
    __metadata("design:type", String)
], PayrollRunsEntity.prototype, "computePHIC", void 0);
__decorate([
    typeorm_1.Column({
        name: 'COMPUTE_SSS',
        type: 'enum',
        enum: deduction_type_1.DeductionType,
        default: deduction_type_1.DeductionType.FULL,
    }),
    __metadata("design:type", String)
], PayrollRunsEntity.prototype, "computeSSS", void 0);
__decorate([
    typeorm_1.Column({
        name: 'DESCRIPTION',
        default: 'Payroll Run',
        nullable: true,
    }),
    __metadata("design:type", String)
], PayrollRunsEntity.prototype, "description", void 0);
PayrollRunsEntity = __decorate([
    typeorm_1.Entity('PAYROLL_RUNS')
], PayrollRunsEntity);
exports.PayrollRunsEntity = PayrollRunsEntity;
//# sourceMappingURL=payroll-runs.entity.js.map