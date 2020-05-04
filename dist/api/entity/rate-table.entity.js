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
const salary_details_entity_1 = require("./employee/salary-details.entity");
const rate_entity_1 = require("./rate.entity");
let RateTableEntity = class RateTableEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'NAME' }),
    __metadata("design:type", String)
], RateTableEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'DESCRIPTION', nullable: true }),
    __metadata("design:type", String)
], RateTableEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(() => salary_details_entity_1.SalaryDetailsEntity, sd => sd.rateTable),
    __metadata("design:type", Array)
], RateTableEntity.prototype, "salaryDetails", void 0);
__decorate([
    typeorm_1.OneToMany(() => rate_entity_1.RateEntity, rate => rate.rateTable, { eager: true, cascade: true }),
    __metadata("design:type", Array)
], RateTableEntity.prototype, "rates", void 0);
RateTableEntity = __decorate([
    typeorm_1.Entity('RATE_TABLE')
], RateTableEntity);
exports.RateTableEntity = RateTableEntity;
//# sourceMappingURL=rate-table.entity.js.map