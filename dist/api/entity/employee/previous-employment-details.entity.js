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
const employee_entity_1 = require("./employee.entity");
let PreviousEmploymentDetailsEntity = class PreviousEmploymentDetailsEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'HAS_PREV_EMPLOYMENT', default: 0 }),
    __metadata("design:type", Boolean)
], PreviousEmploymentDetailsEntity.prototype, "hasPreviousEmployment", void 0);
__decorate([
    typeorm_1.Column({ name: 'NON_TAX_13TH_MONTH', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PreviousEmploymentDetailsEntity.prototype, "nonTax13thMonth", void 0);
__decorate([
    typeorm_1.Column({ name: 'NON_TAX_OTHER_BONUS', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PreviousEmploymentDetailsEntity.prototype, "nonTaxOtherBonus", void 0);
__decorate([
    typeorm_1.Column({ name: 'NON_TAX_SALARIES', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PreviousEmploymentDetailsEntity.prototype, "nonTaxSalaries", void 0);
__decorate([
    typeorm_1.Column({ name: '13TH_MONTH', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PreviousEmploymentDetailsEntity.prototype, "prev13thMonth", void 0);
__decorate([
    typeorm_1.Column({ name: 'OTHER_BONUS', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PreviousEmploymentDetailsEntity.prototype, "otherBonus", void 0);
__decorate([
    typeorm_1.Column({ name: 'TAXABLE_GROSS', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PreviousEmploymentDetailsEntity.prototype, "taxableGross", void 0);
__decorate([
    typeorm_1.Column({ name: 'TAX_WITHHELD', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PreviousEmploymentDetailsEntity.prototype, "taxWithheld", void 0);
__decorate([
    typeorm_1.Column({ name: 'GOV_DEDUCTIONS', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PreviousEmploymentDetailsEntity.prototype, "govDeductions", void 0);
__decorate([
    typeorm_1.Column({ name: 'DE_MINIMIS', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PreviousEmploymentDetailsEntity.prototype, "deMinimis", void 0);
__decorate([
    typeorm_1.Column({ name: 'TAXABLE_COMPENSATION', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PreviousEmploymentDetailsEntity.prototype, "taxableCompensation", void 0);
__decorate([
    typeorm_1.Column({ name: 'MONETIZED_LEAVE', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PreviousEmploymentDetailsEntity.prototype, "monetizedLeave", void 0);
__decorate([
    typeorm_1.OneToOne(() => employee_entity_1.EmployeeEntity, employee => employee.id, {
        cascade: true,
    }),
    typeorm_1.JoinColumn({ name: 'EMP_ID' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], PreviousEmploymentDetailsEntity.prototype, "employee", void 0);
PreviousEmploymentDetailsEntity = __decorate([
    typeorm_1.Entity('PREV_EMPLOYMENT_DETAILS')
], PreviousEmploymentDetailsEntity);
exports.PreviousEmploymentDetailsEntity = PreviousEmploymentDetailsEntity;
//# sourceMappingURL=previous-employment-details.entity.js.map