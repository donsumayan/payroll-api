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
const day_type_1 = require("../constant/day-type");
const base_entity_1 = require("./base.entity");
let CalendarDayEntity = class CalendarDayEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'NAME' }),
    __metadata("design:type", String)
], CalendarDayEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'DATE' }),
    __metadata("design:type", Date)
], CalendarDayEntity.prototype, "date", void 0);
__decorate([
    typeorm_1.Column({ name: 'TYPE', type: 'enum', enum: day_type_1.DayType }),
    __metadata("design:type", String)
], CalendarDayEntity.prototype, "type", void 0);
CalendarDayEntity = __decorate([
    typeorm_1.Entity('CALENDAR_DAYS')
], CalendarDayEntity);
exports.CalendarDayEntity = CalendarDayEntity;
//# sourceMappingURL=calendar-day.entity.js.map