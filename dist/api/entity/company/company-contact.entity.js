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
const company_entity_1 = require("./company.entity");
let CompanyContactEntity = class CompanyContactEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid', { name: 'ID' }),
    __metadata("design:type", String)
], CompanyContactEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'FIRST_ADDRESS' }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], CompanyContactEntity.prototype, "firstAddress", void 0);
__decorate([
    typeorm_1.Column({ name: 'SECOND_ADDRESS' }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], CompanyContactEntity.prototype, "secondAddress", void 0);
__decorate([
    typeorm_1.Column({ name: 'ZIP_CODE' }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], CompanyContactEntity.prototype, "zipCode", void 0);
__decorate([
    typeorm_1.Column({ name: 'REGION' }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], CompanyContactEntity.prototype, "region", void 0);
__decorate([
    typeorm_1.Column({ name: 'EMAIL_ADDRESS' }),
    class_validator_1.IsDefined(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], CompanyContactEntity.prototype, "emailAddress", void 0);
__decorate([
    typeorm_1.Column({ name: 'PHONE' }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], CompanyContactEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ name: 'FAX', nullable: true }),
    __metadata("design:type", String)
], CompanyContactEntity.prototype, "fax", void 0);
__decorate([
    typeorm_1.OneToOne(() => company_entity_1.CompanyEntity, company => company.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'COMPANY_ID' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], CompanyContactEntity.prototype, "company", void 0);
CompanyContactEntity = __decorate([
    typeorm_1.Entity('COMPANY_CONTACT_INFO')
], CompanyContactEntity);
exports.CompanyContactEntity = CompanyContactEntity;
//# sourceMappingURL=company-contact.entity.js.map