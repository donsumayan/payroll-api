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
const bank_acct_type_1 = require("../../constant/bank-acct-type");
const base_entity_1 = require("../base.entity");
const employee_entity_1 = require("./employee.entity");
let BankDetailsEntity = class BankDetailsEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.OneToOne(() => employee_entity_1.EmployeeEntity, e => e.bankDetails),
    typeorm_1.JoinColumn({ name: 'EMP_ID' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], BankDetailsEntity.prototype, "employee", void 0);
__decorate([
    typeorm_1.Column({ name: 'BANK' }),
    __metadata("design:type", String)
], BankDetailsEntity.prototype, "bank", void 0);
__decorate([
    typeorm_1.Column({
        name: 'BANK_ACCOUNT_TYPE',
        type: 'enum',
        enum: bank_acct_type_1.BankAccountType,
        default: bank_acct_type_1.BankAccountType.SAVINGS,
        nullable: true,
    }),
    __metadata("design:type", String)
], BankDetailsEntity.prototype, "bankAccountType", void 0);
__decorate([
    typeorm_1.Column({ name: 'BANK_ACCOUNT_NUMBER', nullable: true }),
    __metadata("design:type", String)
], BankDetailsEntity.prototype, "bankAccountNumber", void 0);
BankDetailsEntity = __decorate([
    typeorm_1.Entity('BANK_DETAILS')
], BankDetailsEntity);
exports.BankDetailsEntity = BankDetailsEntity;
//# sourceMappingURL=bank-details.entity.js.map