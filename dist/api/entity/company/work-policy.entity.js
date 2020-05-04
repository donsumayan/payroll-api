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
const company_entity_1 = require("./company.entity");
let WorkPolicyEntity = class WorkPolicyEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid', { name: 'ID' }),
    __metadata("design:type", String)
], WorkPolicyEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'WORK_DAYS_PER_YR', nullable: true, default: 366 }),
    __metadata("design:type", Number)
], WorkPolicyEntity.prototype, "workDaysPerYear", void 0);
__decorate([
    typeorm_1.Column({ name: 'WORK_HOURS_PER_DAY', nullable: true, default: 8 }),
    __metadata("design:type", Number)
], WorkPolicyEntity.prototype, "workHoursPerDay", void 0);
__decorate([
    typeorm_1.Column({ name: 'WORK_MONTHS_PER_YR', nullable: true, default: 12 }),
    __metadata("design:type", Number)
], WorkPolicyEntity.prototype, "workMonthsPerYear", void 0);
__decorate([
    typeorm_1.Column({ name: 'WORK_HOURS_START', nullable: true }),
    __metadata("design:type", String)
], WorkPolicyEntity.prototype, "workHoursStart", void 0);
__decorate([
    typeorm_1.Column({ name: 'WORK_HOURS_END', nullable: true }),
    __metadata("design:type", String)
], WorkPolicyEntity.prototype, "workHoursEnd", void 0);
__decorate([
    typeorm_1.Column({ name: 'BREAK_HOURS_START', nullable: true }),
    __metadata("design:type", String)
], WorkPolicyEntity.prototype, "breakHoursStart", void 0);
__decorate([
    typeorm_1.Column({ name: 'BREAK_HOURS_END', nullable: true }),
    __metadata("design:type", String)
], WorkPolicyEntity.prototype, "breakHoursEnd", void 0);
__decorate([
    typeorm_1.Column({ name: 'NIGHT_SHIFT_WORK_HOURS_START', nullable: true }),
    __metadata("design:type", String)
], WorkPolicyEntity.prototype, "nightShiftWorkHoursStart", void 0);
__decorate([
    typeorm_1.Column({ name: 'NIGHT_SHIFT_WORK_HOURS_END', nullable: true }),
    __metadata("design:type", String)
], WorkPolicyEntity.prototype, "nightShiftWorkHoursEnd", void 0);
__decorate([
    typeorm_1.OneToOne(() => company_entity_1.CompanyEntity, company => company.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'COMPANY_ID' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], WorkPolicyEntity.prototype, "company", void 0);
WorkPolicyEntity = __decorate([
    typeorm_1.Entity('WORK_POLICY')
], WorkPolicyEntity);
exports.WorkPolicyEntity = WorkPolicyEntity;
//# sourceMappingURL=work-policy.entity.js.map