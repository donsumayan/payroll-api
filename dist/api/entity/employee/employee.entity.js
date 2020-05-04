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
const civil_status_1 = require("../../constant/civil-status");
const gender_1 = require("../../constant/gender");
const base_entity_1 = require("../base.entity");
const company_entity_1 = require("../company/company.entity");
const user_entity_1 = require("../user.entity");
const bank_details_entity_1 = require("./bank-details.entity");
const contact_entity_1 = require("./contact.entity");
const dependents_entity_1 = require("./dependents.entity");
const employee_government_numbers_entity_1 = require("./employee-government-numbers.entity");
const job_details_entity_1 = require("./job-details.entity");
const leave_credits_entity_1 = require("./leave-credits.entity");
const previous_employment_details_entity_1 = require("./previous-employment-details.entity");
const salary_details_entity_1 = require("./salary-details.entity");
let EmployeeEntity = class EmployeeEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({
        name: 'CAN_CALCULATE',
        default: true,
    }),
    __metadata("design:type", Boolean)
], EmployeeEntity.prototype, "canCalculate", void 0);
__decorate([
    typeorm_1.Column({
        name: 'EMPLOYEE_ID',
    }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "employeeId", void 0);
__decorate([
    typeorm_1.Column({
        name: 'FIRST_NAME',
        length: 100,
    }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({
        name: 'MIDDLE_NAME',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "middleName", void 0);
__decorate([
    typeorm_1.Column({
        name: 'LAST_NAME',
        length: 100,
    }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({
        name: 'GENDER',
        type: 'enum',
        enum: gender_1.Gender,
        default: gender_1.Gender.MALE,
    }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column({
        name: 'BIRTHDATE',
        default: null,
        nullable: true,
    }),
    __metadata("design:type", Date)
], EmployeeEntity.prototype, "birthDate", void 0);
__decorate([
    typeorm_1.Column({
        name: 'CIVIL_STATUS',
        type: 'enum',
        enum: civil_status_1.CivilStatus,
        nullable: true,
    }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "civilStatus", void 0);
__decorate([
    typeorm_1.OneToOne(() => contact_entity_1.ContactEntity, contact => contact.employee, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", contact_entity_1.ContactEntity)
], EmployeeEntity.prototype, "contact", void 0);
__decorate([
    typeorm_1.OneToOne(() => salary_details_entity_1.SalaryDetailsEntity, salaryDetails => salaryDetails.employee, { cascade: true }),
    __metadata("design:type", salary_details_entity_1.SalaryDetailsEntity)
], EmployeeEntity.prototype, "salaryDetails", void 0);
__decorate([
    typeorm_1.OneToOne(() => job_details_entity_1.JobDetailsEntity, jobDetails => jobDetails.employee, { cascade: true, eager: true }),
    __metadata("design:type", job_details_entity_1.JobDetailsEntity)
], EmployeeEntity.prototype, "jobDetails", void 0);
__decorate([
    typeorm_1.OneToOne(() => leave_credits_entity_1.LeaveCreditsEntity, leaveCredits => leaveCredits.employee, { cascade: true }),
    __metadata("design:type", leave_credits_entity_1.LeaveCreditsEntity)
], EmployeeEntity.prototype, "leaveCredits", void 0);
__decorate([
    typeorm_1.OneToOne(() => employee_government_numbers_entity_1.EmployeeGovernmentNumbersEntity, governmentNumbers => governmentNumbers.employee, { cascade: true }),
    __metadata("design:type", employee_government_numbers_entity_1.EmployeeGovernmentNumbersEntity)
], EmployeeEntity.prototype, "governmentNumbers", void 0);
__decorate([
    typeorm_1.OneToMany(() => dependents_entity_1.DependentsEntity, dependents => dependents.employee, { cascade: ['insert', 'remove', 'update'] }),
    __metadata("design:type", dependents_entity_1.DependentsEntity)
], EmployeeEntity.prototype, "dependents", void 0);
__decorate([
    typeorm_1.OneToOne(() => bank_details_entity_1.BankDetailsEntity, bd => bd.employee, { cascade: ['insert', 'remove', 'update'] }),
    __metadata("design:type", bank_details_entity_1.BankDetailsEntity)
], EmployeeEntity.prototype, "bankDetails", void 0);
__decorate([
    typeorm_1.OneToOne(() => previous_employment_details_entity_1.PreviousEmploymentDetailsEntity, ped => ped.employee),
    __metadata("design:type", previous_employment_details_entity_1.PreviousEmploymentDetailsEntity)
], EmployeeEntity.prototype, "previousEmploymentDetails", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_entity_1.UserEntity, user => user.employee),
    __metadata("design:type", user_entity_1.UserEntity)
], EmployeeEntity.prototype, "userDetails", void 0);
__decorate([
    typeorm_1.ManyToOne(() => company_entity_1.CompanyEntity, company => company.employees, { cascade: false }),
    typeorm_1.JoinColumn({ name: 'COMPANY_ID' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], EmployeeEntity.prototype, "company", void 0);
__decorate([
    typeorm_1.Column({ name: 'COMPANY_ID' }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "companyId", void 0);
EmployeeEntity = __decorate([
    typeorm_1.Entity('EMPLOYEE')
], EmployeeEntity);
exports.EmployeeEntity = EmployeeEntity;
//# sourceMappingURL=employee.entity.js.map