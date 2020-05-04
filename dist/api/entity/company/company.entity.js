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
const employee_entity_1 = require("../employee/employee.entity");
const company_contact_entity_1 = require("./company-contact.entity");
const company_govt_numbers_entity_1 = require("./company-govt-numbers.entity");
const company_signatories_entity_1 = require("./company-signatories.entity");
const payroll_computation_entity_1 = require("./payroll-computation/payroll-computation.entity");
const tax_computation_entity_1 = require("./tax-computation.entity");
const work_policy_entity_1 = require("./work-policy.entity");
let CompanyEntity = class CompanyEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'COMPANY_LOGO_ID', nullable: true }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "companyLogoId", void 0);
__decorate([
    typeorm_1.Column({ name: 'COMPANY_NAME' }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "companyName", void 0);
__decorate([
    typeorm_1.Column({ name: 'NATURE_OF_BUSINESS', nullable: true }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "natureOfBusiness", void 0);
__decorate([
    typeorm_1.OneToOne(() => company_govt_numbers_entity_1.CompanyGovernmentNumbersEntity, companyGovernmentNumbers => companyGovernmentNumbers.company, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", company_govt_numbers_entity_1.CompanyGovernmentNumbersEntity)
], CompanyEntity.prototype, "governmentNumbers", void 0);
__decorate([
    typeorm_1.OneToOne(() => company_contact_entity_1.CompanyContactEntity, contact => contact.company, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", company_contact_entity_1.CompanyContactEntity)
], CompanyEntity.prototype, "contact", void 0);
__decorate([
    typeorm_1.OneToOne(() => company_signatories_entity_1.CompanySignatories, signatories => signatories.company, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", company_signatories_entity_1.CompanySignatories)
], CompanyEntity.prototype, "signatories", void 0);
__decorate([
    typeorm_1.OneToOne(() => work_policy_entity_1.WorkPolicyEntity, workPolicy => workPolicy.company, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", work_policy_entity_1.WorkPolicyEntity)
], CompanyEntity.prototype, "workPolicy", void 0);
__decorate([
    typeorm_1.OneToOne(() => payroll_computation_entity_1.PayrollComputationEntity, payrollComputation => payrollComputation.company, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", payroll_computation_entity_1.PayrollComputationEntity)
], CompanyEntity.prototype, "payrollComputation", void 0);
__decorate([
    typeorm_1.OneToOne(() => tax_computation_entity_1.TaxComputationEntity, taxComputation => taxComputation.company, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", tax_computation_entity_1.TaxComputationEntity)
], CompanyEntity.prototype, "taxComputation", void 0);
__decorate([
    typeorm_1.Column({ name: 'PASSWORD_EXPIRATION_DAYS', default: 90 }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "passwordExpirationDays", void 0);
__decorate([
    typeorm_1.OneToMany(() => employee_entity_1.EmployeeEntity, emp => emp.company),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "employees", void 0);
CompanyEntity = __decorate([
    typeorm_1.Entity('COMPANY')
], CompanyEntity);
exports.CompanyEntity = CompanyEntity;
//# sourceMappingURL=company.entity.js.map