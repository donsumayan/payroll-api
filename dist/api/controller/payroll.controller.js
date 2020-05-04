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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const action_type_1 = require("../constant/action-type");
const api_features_1 = require("../constant/api-features");
const action_decorators_1 = require("../decorators/action.decorators");
const response_dto_1 = require("../dto/response.dto");
const roles_guard_1 = require("../guards/roles.guard");
const employee_service_1 = require("../service/employee.service");
const payroll_computation_service_1 = require("../service/payroll-computation.service");
let PayrollController = class PayrollController {
    constructor(payrollComputationService, employeeService) {
        this.payrollComputationService = payrollComputationService;
        this.employeeService = employeeService;
    }
    async getByEmployee(id, dateFrom, dateTo) {
        const details = await this.payrollComputationService.calculatePerEmployee(id, dateFrom, dateTo);
        return new response_dto_1.ResponseDTO('Retrieved...', details, common_1.HttpStatus.OK);
    }
};
__decorate([
    common_1.Get('employee/:id'),
    action_decorators_1.Action(action_type_1.ActionType.READ),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Query('dateFrom')),
    __param(2, common_1.Query('dateTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "getByEmployee", null);
PayrollController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    action_decorators_1.Feature(api_features_1.ACCESS.PAYROLL),
    common_1.Controller('payroll'),
    __metadata("design:paramtypes", [payroll_computation_service_1.PayrollComputationService,
        employee_service_1.EmployeeService])
], PayrollController);
exports.PayrollController = PayrollController;
//# sourceMappingURL=payroll.controller.js.map