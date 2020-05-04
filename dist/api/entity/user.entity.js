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
const base_entity_1 = require("./base.entity");
const company_entity_1 = require("./company/company.entity");
const employee_entity_1 = require("./employee/employee.entity");
const role_entity_1 = require("./role.entity");
let UserEntity = class UserEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'USERNAME', unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ name: 'PASSWORD', unique: false, select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ name: 'SALT', unique: false, select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "salt", void 0);
__decorate([
    typeorm_1.ManyToMany(() => role_entity_1.RoleEntity),
    typeorm_1.JoinTable({ name: 'USER_ROLES' }),
    __metadata("design:type", Array)
], UserEntity.prototype, "roles", void 0);
__decorate([
    typeorm_1.OneToOne(() => employee_entity_1.EmployeeEntity, employee => employee.id),
    typeorm_1.JoinColumn({ name: 'EMP_ID' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], UserEntity.prototype, "employee", void 0);
__decorate([
    typeorm_1.Column({ name: 'EMP_ID', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "employeeId", void 0);
__decorate([
    typeorm_1.Column({ name: 'COMPANY_ID', unique: false, readonly: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "companyId", void 0);
__decorate([
    typeorm_1.Column({ name: 'FIRST_LOGIN', default: true }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "firstLogin", void 0);
UserEntity = __decorate([
    typeorm_1.Entity('USER')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map