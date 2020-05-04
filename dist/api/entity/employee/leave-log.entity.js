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
const leave_1 = require("../../constant/leave");
const base_entity_1 = require("../base.entity");
const employee_entity_1 = require("./employee.entity");
let LeaveLogsEntity = class LeaveLogsEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'LEAVE_START', type: 'timestamp', default: null }),
    __metadata("design:type", String)
], LeaveLogsEntity.prototype, "start", void 0);
__decorate([
    typeorm_1.Column({ name: 'LEAVE_END', type: 'timestamp', default: null }),
    __metadata("design:type", String)
], LeaveLogsEntity.prototype, "end", void 0);
__decorate([
    typeorm_1.Column({ name: 'HOURS', type: 'double' }),
    __metadata("design:type", Number)
], LeaveLogsEntity.prototype, "hours", void 0);
__decorate([
    typeorm_1.Column({
        name: 'TYPE',
        type: 'enum',
        enum: leave_1.LeaveType,
        default: leave_1.LeaveType.VL,
    }),
    __metadata("design:type", String)
], LeaveLogsEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ name: 'REASON', nullable: true }),
    __metadata("design:type", String)
], LeaveLogsEntity.prototype, "reason", void 0);
__decorate([
    typeorm_1.Column({
        name: 'STATUS',
        type: 'enum',
        enum: leave_1.LeaveStatus,
        default: leave_1.LeaveStatus.APPROVED,
    }),
    __metadata("design:type", String)
], LeaveLogsEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ name: 'APPROVED_BY', nullable: true }),
    __metadata("design:type", String)
], LeaveLogsEntity.prototype, "approvedBy", void 0);
__decorate([
    typeorm_1.Column({ name: 'WITH_PAY', default: 0 }),
    __metadata("design:type", Boolean)
], LeaveLogsEntity.prototype, "withPay", void 0);
__decorate([
    typeorm_1.ManyToOne(() => employee_entity_1.EmployeeEntity, employee => employee.id),
    typeorm_1.JoinColumn({ name: 'EMP_ID' }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], LeaveLogsEntity.prototype, "employee", void 0);
__decorate([
    typeorm_1.Column({ name: 'EMP_ID' }),
    __metadata("design:type", String)
], LeaveLogsEntity.prototype, "employeeId", void 0);
LeaveLogsEntity = __decorate([
    typeorm_1.Entity('LEAVE_LOGS')
], LeaveLogsEntity);
exports.LeaveLogsEntity = LeaveLogsEntity;
//# sourceMappingURL=leave-log.entity.js.map