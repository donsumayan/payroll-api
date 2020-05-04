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
let ShiftEntity = class ShiftEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'NAME' }),
    __metadata("design:type", String)
], ShiftEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'DESCRIPTION', nullable: true }),
    __metadata("design:type", String)
], ShiftEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ name: 'WORK_HOURS_PER_DAY' }),
    __metadata("design:type", Number)
], ShiftEntity.prototype, "workHrsPerDay", void 0);
__decorate([
    typeorm_1.Column({ name: 'WORK_HRS_START' }),
    __metadata("design:type", String)
], ShiftEntity.prototype, "workHrsStart", void 0);
__decorate([
    typeorm_1.Column({ name: 'WORK_HRS_END' }),
    __metadata("design:type", String)
], ShiftEntity.prototype, "workHrsEnd", void 0);
__decorate([
    typeorm_1.Column({ name: 'BREAK_HRS_START' }),
    __metadata("design:type", String)
], ShiftEntity.prototype, "breakHrsStart", void 0);
__decorate([
    typeorm_1.Column({ name: 'BREAK_HRS_END' }),
    __metadata("design:type", String)
], ShiftEntity.prototype, "breakHrsEnd", void 0);
ShiftEntity = __decorate([
    typeorm_1.Entity('SHIFT')
], ShiftEntity);
exports.ShiftEntity = ShiftEntity;
//# sourceMappingURL=shift.entity.js.map