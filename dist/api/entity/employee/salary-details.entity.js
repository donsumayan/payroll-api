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
const base_entity_1 = require("../base.entity");
const rate_table_entity_1 = require("../rate-table.entity");
const deminimis_entity_1 = require("./deminimis.entity");
const employee_contribution_entity_1 = require("./employee-contribution.entity");
const employee_entity_1 = require("./employee.entity");
let SalaryDetailsEntity = class SalaryDetailsEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'IS_MIN_WAGE_EARNER', default: 0 }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Boolean)
], SalaryDetailsEntity.prototype, "isMinimumWageEarner", void 0);
__decorate([
    typeorm_1.Column({ name: 'IS_DAILY_PAID', default: 0 }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Boolean)
], SalaryDetailsEntity.prototype, "isDailyPaid", void 0);
__decorate([
    typeorm_1.Column({ name: 'COLA', type: 'double', default: 0 }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Number)
], SalaryDetailsEntity.prototype, "cola", void 0);
__decorate([
    typeorm_1.Column({ name: 'WORK_DAYS_PER_YEAR', type: 'double', default: 0 }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Number)
], SalaryDetailsEntity.prototype, "workDaysPerYear", void 0);
__decorate([
    typeorm_1.Column({ name: 'BASIC_SALARY', type: 'double', default: 0 }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Number)
], SalaryDetailsEntity.prototype, "basicSalary", void 0);
__decorate([
    typeorm_1.OneToMany(() => deminimis_entity_1.DeMinimisBenefitEntity, dm => dm.salaryEntity, {
        eager: true,
        cascade: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], SalaryDetailsEntity.prototype, "deMinimis", void 0);
__decorate([
    typeorm_1.Column({
        name: 'ADDITIONAL_HDMF',
        type: 'double',
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], SalaryDetailsEntity.prototype, "additionalHdmfContribution", void 0);
__decorate([
    typeorm_1.ManyToOne(() => rate_table_entity_1.RateTableEntity, rt => rt.id, { eager: true }),
    typeorm_1.JoinColumn({ name: 'EMP_TABLE_ID' }),
    __metadata("design:type", rate_table_entity_1.RateTableEntity)
], SalaryDetailsEntity.prototype, "rateTable", void 0);
__decorate([
    typeorm_1.OneToOne(() => employee_entity_1.EmployeeEntity, employee => employee.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'EMP_ID' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], SalaryDetailsEntity.prototype, "employee", void 0);
__decorate([
    typeorm_1.OneToOne(() => employee_contribution_entity_1.EmployeeContributionEntity, ec => ec.salaryDetails, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", employee_contribution_entity_1.EmployeeContributionEntity)
], SalaryDetailsEntity.prototype, "contribution", void 0);
SalaryDetailsEntity = __decorate([
    typeorm_1.Entity('SALARY_DETAILS')
], SalaryDetailsEntity);
exports.SalaryDetailsEntity = SalaryDetailsEntity;
//# sourceMappingURL=salary-details.entity.js.map