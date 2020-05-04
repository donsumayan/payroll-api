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
const day_type_1 = require("../constant/day-type");
const base_entity_1 = require("./base.entity");
const rate_table_entity_1 = require("./rate-table.entity");
let RateEntity = class RateEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'NAME' }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], RateEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'REGULAR', type: 'double', default: 1 }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Number)
], RateEntity.prototype, "regular", void 0);
__decorate([
    typeorm_1.Column({ name: 'OVERTIME', type: 'double', default: 1 }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Number)
], RateEntity.prototype, "overtime", void 0);
__decorate([
    typeorm_1.Column({ name: 'NIGHT_DIFF', type: 'double', default: 1 }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Number)
], RateEntity.prototype, "nightDiff", void 0);
__decorate([
    typeorm_1.Column({ name: 'NIGHT_DIFF_OT', type: 'double', default: 1 }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Number)
], RateEntity.prototype, "nightDiffOT", void 0);
__decorate([
    typeorm_1.Column({
        name: 'TYPE',
        type: 'enum',
        enum: day_type_1.DayType,
        nullable: true,
    }),
    __metadata("design:type", String)
], RateEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(() => rate_table_entity_1.RateTableEntity, rateTable => rateTable.id),
    typeorm_1.JoinColumn({ name: 'RATE_TABLE' }),
    __metadata("design:type", rate_table_entity_1.RateTableEntity)
], RateEntity.prototype, "rateTable", void 0);
RateEntity = __decorate([
    typeorm_1.Entity('RATES')
], RateEntity);
exports.RateEntity = RateEntity;
//# sourceMappingURL=rate.entity.js.map