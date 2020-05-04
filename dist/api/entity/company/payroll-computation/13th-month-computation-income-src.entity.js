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
const base_entity_1 = require("../../base.entity");
const income_source_entity_1 = require("../income-source.entity");
const _13th_month_computation_entity_1 = require("./13th-month-computation.entity");
let Company13thMonthComputationIncomeSourceEntity = class Company13thMonthComputationIncomeSourceEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.ManyToOne(() => _13th_month_computation_entity_1.Company13thMonthComputationEntity, company13thMonthComputation => company13thMonthComputation.id),
    typeorm_1.JoinColumn({ name: 'COMPANY_13TH_MONTH_COMPUTATION_ID' }),
    __metadata("design:type", _13th_month_computation_entity_1.Company13thMonthComputationEntity)
], Company13thMonthComputationIncomeSourceEntity.prototype, "company13thMonthComputation", void 0);
__decorate([
    typeorm_1.ManyToOne(() => income_source_entity_1.IncomeSourceEntity, incomeSource => incomeSource.id, { eager: true }),
    typeorm_1.JoinColumn({ name: 'INCOME_SOURCE_ID' }),
    __metadata("design:type", Object)
], Company13thMonthComputationIncomeSourceEntity.prototype, "incomeSource", void 0);
__decorate([
    typeorm_1.Column({ name: 'IS_SELECTED', default: 0 }),
    __metadata("design:type", Boolean)
], Company13thMonthComputationIncomeSourceEntity.prototype, "selected", void 0);
Company13thMonthComputationIncomeSourceEntity = __decorate([
    typeorm_1.Entity('COMPANY_13TH_MONTH_COMPUTATION_INCOME_SOURCE')
], Company13thMonthComputationIncomeSourceEntity);
exports.Company13thMonthComputationIncomeSourceEntity = Company13thMonthComputationIncomeSourceEntity;
//# sourceMappingURL=13th-month-computation-income-src.entity.js.map