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
const employee_entity_1 = require("./employee.entity");
let DependentsEntity = class DependentsEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid', { name: 'ID' }),
    __metadata("design:type", String)
], DependentsEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'FULL_NAME' }),
    __metadata("design:type", String)
], DependentsEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'DATE_OF_BIRTH' }),
    __metadata("design:type", String)
], DependentsEntity.prototype, "birthDate", void 0);
__decorate([
    typeorm_1.Column({ name: 'RELATIONSHIP' }),
    __metadata("design:type", String)
], DependentsEntity.prototype, "relationship", void 0);
__decorate([
    typeorm_1.ManyToOne(() => employee_entity_1.EmployeeEntity, employee => employee.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'EMP_ID' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], DependentsEntity.prototype, "employee", void 0);
DependentsEntity = __decorate([
    typeorm_1.Entity('DEPENDENTS')
], DependentsEntity);
exports.DependentsEntity = DependentsEntity;
//# sourceMappingURL=dependents.entity.js.map