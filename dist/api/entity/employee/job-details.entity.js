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
const cost_center_entity_1 = require("../cost-center.entity");
const department_entity_1 = require("../department.entity");
const pay_group_entity_1 = require("../pay-group.entity");
const shift_entity_1 = require("../shift.entity");
const employee_entity_1 = require("./employee.entity");
let JobDetailsEntity = class JobDetailsEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'JOB_TITLE', nullable: true }),
    __metadata("design:type", String)
], JobDetailsEntity.prototype, "jobTitle", void 0);
__decorate([
    typeorm_1.Column({ name: 'HIRE_DATE', nullable: true }),
    __metadata("design:type", String)
], JobDetailsEntity.prototype, "hireDate", void 0);
__decorate([
    typeorm_1.Column({ name: 'EMPLOYMENT_STATUS', default: 'INACTIVE' }),
    __metadata("design:type", String)
], JobDetailsEntity.prototype, "employmentStatus", void 0);
__decorate([
    typeorm_1.OneToOne(() => employee_entity_1.EmployeeEntity, employee => employee.jobDetails),
    typeorm_1.JoinColumn({ name: 'EMP_ID' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], JobDetailsEntity.prototype, "employee", void 0);
__decorate([
    typeorm_1.Column({ name: 'REST_DAYS' }),
    __metadata("design:type", String)
], JobDetailsEntity.prototype, "restDays", void 0);
__decorate([
    typeorm_1.ManyToOne(() => department_entity_1.DepartmentEntity, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: 'DEPT_ID' }),
    __metadata("design:type", department_entity_1.DepartmentEntity)
], JobDetailsEntity.prototype, "department", void 0);
__decorate([
    class_validator_1.IsDefined(),
    typeorm_1.Column({ name: 'DEPT_ID' }),
    __metadata("design:type", String)
], JobDetailsEntity.prototype, "departmentId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => cost_center_entity_1.CostCenterEntity, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: 'COST_CENTER_ID' }),
    __metadata("design:type", cost_center_entity_1.CostCenterEntity)
], JobDetailsEntity.prototype, "costCenter", void 0);
__decorate([
    class_validator_1.IsDefined(),
    typeorm_1.Column({ name: 'COST_CENTER_ID' }),
    __metadata("design:type", String)
], JobDetailsEntity.prototype, "costCenterId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => pay_group_entity_1.PayGroupEntity, {
        eager: true,
        onDelete: 'RESTRICT',
    }),
    typeorm_1.JoinColumn({
        name: 'PAY_GROUP_ID',
    }),
    __metadata("design:type", pay_group_entity_1.PayGroupEntity)
], JobDetailsEntity.prototype, "payGroup", void 0);
__decorate([
    class_validator_1.IsDefined(),
    typeorm_1.Column({ name: 'PAY_GROUP_ID' }),
    __metadata("design:type", String)
], JobDetailsEntity.prototype, "payGroupId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => shift_entity_1.ShiftEntity),
    typeorm_1.JoinColumn({ name: 'SHIFT_ID' }),
    __metadata("design:type", shift_entity_1.ShiftEntity)
], JobDetailsEntity.prototype, "shift", void 0);
__decorate([
    class_validator_1.IsDefined(),
    typeorm_1.Column({ name: 'SHIFT_ID' }),
    __metadata("design:type", String)
], JobDetailsEntity.prototype, "shiftId", void 0);
JobDetailsEntity = __decorate([
    typeorm_1.Entity('JOB_DETAILS')
], JobDetailsEntity);
exports.JobDetailsEntity = JobDetailsEntity;
//# sourceMappingURL=job-details.entity.js.map