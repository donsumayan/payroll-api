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
const base_entity_1 = require("../base.entity");
const salary_details_entity_1 = require("./salary-details.entity");
let EmployeeContributionEntity = class EmployeeContributionEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'CALC_SSS', default: true }),
    __metadata("design:type", Boolean)
], EmployeeContributionEntity.prototype, "calcSSS", void 0);
__decorate([
    typeorm_1.Column({ name: 'EE_SSS', default: 0 }),
    __metadata("design:type", Number)
], EmployeeContributionEntity.prototype, "eeSSS", void 0);
__decorate([
    typeorm_1.Column({ name: 'ER_SSS', default: 0 }),
    __metadata("design:type", Number)
], EmployeeContributionEntity.prototype, "erSSS", void 0);
__decorate([
    typeorm_1.Column({ name: 'CALC_PHIC', default: true }),
    __metadata("design:type", Boolean)
], EmployeeContributionEntity.prototype, "calcPHIC", void 0);
__decorate([
    typeorm_1.Column({ name: 'EE_PHIC', default: 0 }),
    __metadata("design:type", Number)
], EmployeeContributionEntity.prototype, "eePHIC", void 0);
__decorate([
    typeorm_1.Column({ name: 'ER_PHIC', default: 0 }),
    __metadata("design:type", Number)
], EmployeeContributionEntity.prototype, "erPHIC", void 0);
__decorate([
    typeorm_1.Column({ name: 'CALC_HDMF', default: true }),
    __metadata("design:type", Boolean)
], EmployeeContributionEntity.prototype, "calcHDMF", void 0);
__decorate([
    typeorm_1.Column({ name: 'EE_HDMF', default: 0 }),
    __metadata("design:type", Number)
], EmployeeContributionEntity.prototype, "eeHDMF", void 0);
__decorate([
    typeorm_1.Column({ name: 'ER_HDMF', default: 0 }),
    __metadata("design:type", Number)
], EmployeeContributionEntity.prototype, "erHDMF", void 0);
__decorate([
    typeorm_1.OneToOne(() => salary_details_entity_1.SalaryDetailsEntity, salaryDetailsEntity => salaryDetailsEntity.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'SALARY_DTLS_ID' }),
    __metadata("design:type", salary_details_entity_1.SalaryDetailsEntity)
], EmployeeContributionEntity.prototype, "salaryDetails", void 0);
EmployeeContributionEntity = __decorate([
    typeorm_1.Entity('EMPLOYEE_CONTRIBUTION')
], EmployeeContributionEntity);
exports.EmployeeContributionEntity = EmployeeContributionEntity;
//# sourceMappingURL=employee-contribution.entity.js.map