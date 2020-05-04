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
const timelog_type_1 = require("../../constant/timelog-type");
const base_entity_1 = require("../base.entity");
const site_entity_1 = require("../site.entity");
const employee_entity_1 = require("./employee.entity");
let TimelogEntity = class TimelogEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.CreateDateColumn({ name: 'SERVER_TIME' }),
    __metadata("design:type", Date)
], TimelogEntity.prototype, "serverTime", void 0);
__decorate([
    typeorm_1.Column({ name: 'CLIENT_TIME', nullable: true }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], TimelogEntity.prototype, "time", void 0);
__decorate([
    typeorm_1.Column({ name: 'CLIENT_DATE' }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], TimelogEntity.prototype, "date", void 0);
__decorate([
    typeorm_1.Column({ name: 'TYPE', type: 'enum', enum: timelog_type_1.TimelogType }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], TimelogEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ name: 'REMARKS', nullable: true }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], TimelogEntity.prototype, "remarks", void 0);
__decorate([
    typeorm_1.ManyToOne(() => employee_entity_1.EmployeeEntity, employee => employee.id),
    typeorm_1.JoinColumn({ name: 'EMP_ID' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], TimelogEntity.prototype, "employee", void 0);
__decorate([
    typeorm_1.ManyToOne(() => site_entity_1.SiteEntity, site => site.id, { eager: true }),
    typeorm_1.JoinColumn({ name: 'SITE_ID' }),
    __metadata("design:type", site_entity_1.SiteEntity)
], TimelogEntity.prototype, "site", void 0);
TimelogEntity = __decorate([
    typeorm_1.Entity('TIMELOGS')
], TimelogEntity);
exports.TimelogEntity = TimelogEntity;
//# sourceMappingURL=timelog.entity.js.map