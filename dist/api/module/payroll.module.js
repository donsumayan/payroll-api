"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payroll_runs_controller_1 = require("../controller/payroll-runs.controller");
const payroll_controller_1 = require("../controller/payroll.controller");
const leave_log_entity_1 = require("../entity/employee/leave-log.entity");
const payroll_runs_entity_1 = require("../entity/payroll-runs.entity");
const payroll_computation_service_1 = require("../service/payroll-computation.service");
const payroll_runs_service_1 = require("../service/payroll-runs.service");
const calendar_module_1 = require("./calendar.module");
const company_module_1 = require("./company.module");
const employee_module_1 = require("./employee.module");
let PayrollModule = class PayrollModule {
};
PayrollModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([payroll_runs_entity_1.PayrollRunsEntity, leave_log_entity_1.LeaveLogsEntity]),
            employee_module_1.EmployeeModule,
            calendar_module_1.CalendarModule,
            company_module_1.CompanyModule,
        ],
        controllers: [payroll_controller_1.PayrollController, payroll_runs_controller_1.PayrollRunsController],
        providers: [payroll_computation_service_1.PayrollComputationService, payroll_runs_service_1.PayrollRunsService],
    })
], PayrollModule);
exports.PayrollModule = PayrollModule;
//# sourceMappingURL=payroll.module.js.map