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
const employee_controller_1 = require("../controller/employee.controller");
const employment_status_controller_1 = require("../controller/employment-status.controller");
const government_references_controller_1 = require("../controller/government-references.controller");
const leave_controller_1 = require("../controller/leave.controller");
const shift_controller_1 = require("../controller/shift.controller");
const timelog_controller_1 = require("../controller/timelog.controller");
const employee_site_entity_1 = require("../entity/employee/employee-site.entity");
const employee_entity_1 = require("../entity/employee/employee.entity");
const employment_status_entity_1 = require("../entity/employee/employment-status.entity");
const leave_log_entity_1 = require("../entity/employee/leave-log.entity");
const timelog_entity_1 = require("../entity/employee/timelog.entity");
const shift_entity_1 = require("../entity/shift.entity");
const site_entity_1 = require("../entity/site.entity");
const employee_site_service_1 = require("../service/employee-site.service");
const employee_service_1 = require("../service/employee.service");
const employment_status_service_1 = require("../service/employment-status.service");
const government_references_service_1 = require("../service/government-references.service");
const leave_service_1 = require("../service/leave.service");
const shift_service_1 = require("../service/shift.service");
const site_service_1 = require("../service/site.service");
const timelog_service_1 = require("../service/timelog.service");
const calendar_module_1 = require("./calendar.module");
const company_module_1 = require("./company.module");
const user_module_1 = require("./user.module");
let EmployeeModule = class EmployeeModule {
};
EmployeeModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                employee_entity_1.EmployeeEntity,
                timelog_entity_1.TimelogEntity,
                employee_site_entity_1.EmployeeSiteEntity,
                employment_status_entity_1.EmploymentStatusEntity,
                leave_log_entity_1.LeaveLogsEntity,
                shift_entity_1.ShiftEntity,
                site_entity_1.SiteEntity,
            ]),
            user_module_1.UserModule,
            calendar_module_1.CalendarModule,
            company_module_1.CompanyModule,
        ],
        controllers: [
            employee_controller_1.EmployeeController,
            timelog_controller_1.TimelogController,
            government_references_controller_1.GovernmentReferencesController,
            employment_status_controller_1.EmploymentStatusController,
            leave_controller_1.LeaveController,
            shift_controller_1.ShiftController,
        ],
        providers: [
            employee_service_1.EmployeeService,
            timelog_service_1.TimelogService,
            employee_site_service_1.EmployeeSiteService,
            government_references_service_1.GovernmentReferenceService,
            employment_status_service_1.EmploymentStatusService,
            leave_service_1.LeaveService,
            shift_service_1.ShiftService,
            site_service_1.SiteService,
        ],
        exports: [
            employee_service_1.EmployeeService,
            government_references_service_1.GovernmentReferenceService,
            timelog_service_1.TimelogService,
            leave_service_1.LeaveService,
        ],
    })
], EmployeeModule);
exports.EmployeeModule = EmployeeModule;
//# sourceMappingURL=employee.module.js.map