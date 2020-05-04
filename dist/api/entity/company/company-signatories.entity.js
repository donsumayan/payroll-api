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
const admin_signatory_entity_1 = require("./admin-signatory.entity");
const company_entity_1 = require("./company.entity");
const finance_signatory_entity_1 = require("./finance-signatory.entity");
const hr_signatory_entity_1 = require("./hr-signatory.entity");
let CompanySignatories = class CompanySignatories {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid', { name: 'ID' }),
    __metadata("design:type", String)
], CompanySignatories.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(() => admin_signatory_entity_1.AdminSignatoryEntity, adminSignatory => adminSignatory.id, {
        cascade: true,
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: 'ADMIN_SIGNATORY_ID' }),
    __metadata("design:type", hr_signatory_entity_1.HrSignatoryEntity)
], CompanySignatories.prototype, "admin", void 0);
__decorate([
    typeorm_1.OneToOne(() => finance_signatory_entity_1.FinanceSignatoryEntity, financeSignatory => financeSignatory.id, {
        cascade: true,
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: 'FINANCE_SIGNATORY_ID' }),
    __metadata("design:type", hr_signatory_entity_1.HrSignatoryEntity)
], CompanySignatories.prototype, "finance", void 0);
__decorate([
    typeorm_1.OneToOne(() => hr_signatory_entity_1.HrSignatoryEntity, hrSignatory => hrSignatory.id, {
        cascade: true,
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: 'HR_SIGNATORY_ID' }),
    __metadata("design:type", hr_signatory_entity_1.HrSignatoryEntity)
], CompanySignatories.prototype, "hr", void 0);
__decorate([
    typeorm_1.OneToOne(() => company_entity_1.CompanyEntity, company => company.id),
    typeorm_1.JoinColumn({ name: 'COMPANY_ID' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], CompanySignatories.prototype, "company", void 0);
CompanySignatories = __decorate([
    typeorm_1.Entity('COMPANY_SIGNATORIES')
], CompanySignatories);
exports.CompanySignatories = CompanySignatories;
//# sourceMappingURL=company-signatories.entity.js.map