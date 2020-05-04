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
let ContactEntity = class ContactEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'CONTACT_NUMBER', nullable: true }),
    __metadata("design:type", String)
], ContactEntity.prototype, "contactNumber", void 0);
__decorate([
    typeorm_1.Column({ name: 'HOME_ADDRESS', nullable: true }),
    __metadata("design:type", String)
], ContactEntity.prototype, "homeAddress", void 0);
__decorate([
    typeorm_1.Column({ name: 'ZIP_CODE', nullable: true }),
    __metadata("design:type", String)
], ContactEntity.prototype, "zipCode", void 0);
__decorate([
    typeorm_1.Column({ name: 'EMAIL_ADDRESS', nullable: true }),
    __metadata("design:type", String)
], ContactEntity.prototype, "emailAddress", void 0);
__decorate([
    typeorm_1.OneToOne(() => employee_entity_1.EmployeeEntity, employee => employee.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'EMP_ID' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], ContactEntity.prototype, "employee", void 0);
ContactEntity = __decorate([
    typeorm_1.Entity('CONTACT_INFO')
], ContactEntity);
exports.ContactEntity = ContactEntity;
//# sourceMappingURL=contact.entity.js.map