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
const job_details_entity_1 = require("../../employee/job-details.entity");
const payroll_computation_entity_1 = require("./payroll-computation.entity");
let WeekDayEntity = class WeekDayEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'IS_SELECTED', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], WeekDayEntity.prototype, "isSelected", void 0);
__decorate([
    typeorm_1.Column({ name: 'NAME' }),
    __metadata("design:type", String)
], WeekDayEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'PARENT_ID' }),
    __metadata("design:type", String)
], WeekDayEntity.prototype, "parentId", void 0);
WeekDayEntity = __decorate([
    typeorm_1.Entity('WEEK_DAYS')
], WeekDayEntity);
exports.WeekDayEntity = WeekDayEntity;
let EmployeeRestDayEntity = class EmployeeRestDayEntity extends WeekDayEntity {
};
__decorate([
    typeorm_1.ManyToOne(() => job_details_entity_1.JobDetailsEntity, pce => pce.id),
    typeorm_1.JoinColumn({ name: 'PARENT_ID' }),
    __metadata("design:type", job_details_entity_1.JobDetailsEntity)
], EmployeeRestDayEntity.prototype, "jobDetails", void 0);
EmployeeRestDayEntity = __decorate([
    typeorm_1.Entity('WEEK_DAYS')
], EmployeeRestDayEntity);
exports.EmployeeRestDayEntity = EmployeeRestDayEntity;
let DefaultRestDayEntity = class DefaultRestDayEntity extends WeekDayEntity {
};
__decorate([
    typeorm_1.ManyToOne(() => payroll_computation_entity_1.PayrollComputationEntity, pce => pce.id),
    typeorm_1.JoinColumn({ name: 'PARENT_ID' }),
    __metadata("design:type", payroll_computation_entity_1.PayrollComputationEntity)
], DefaultRestDayEntity.prototype, "payrollComputation", void 0);
DefaultRestDayEntity = __decorate([
    typeorm_1.Entity('WEEK_DAYS')
], DefaultRestDayEntity);
exports.DefaultRestDayEntity = DefaultRestDayEntity;
//# sourceMappingURL=week-day.entity.js.map