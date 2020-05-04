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
const app_controller_1 = require("./controller/app.controller");
const auth_module_1 = require("./module/auth.module");
const bank_module_1 = require("./module/bank.module");
const calendar_module_1 = require("./module/calendar.module");
const company_module_1 = require("./module/company.module");
const cost_center_module_1 = require("./module/cost-center.module");
const department_module_1 = require("./module/department.module");
const employee_module_1 = require("./module/employee.module");
const file_module_1 = require("./module/file.module");
const mail_module_1 = require("./module/mail.module");
const pay_group_module_1 = require("./module/pay-group.module");
const payroll_module_1 = require("./module/payroll.module");
const site_module_1 = require("./module/site.module");
const user_module_1 = require("./module/user.module");
const port = +process.env.DB_PORT;
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;
const synchronize = !!process.env.SYNC;
const SnakeNamingStrategy = require('typeorm-naming-strategies')
    .SnakeNamingStrategy;
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host,
                port,
                username,
                password,
                database,
                entities: ['dist/**/*.entity.js'],
                synchronize,
                namingStrategy: new SnakeNamingStrategy(),
                charset: 'utf8mb4',
            }),
            common_1.HttpModule,
            auth_module_1.AuthModule,
            employee_module_1.EmployeeModule,
            file_module_1.FileModule,
            department_module_1.DepartmentModule,
            user_module_1.UserModule,
            pay_group_module_1.PayGroupModule,
            user_module_1.UserModule,
            cost_center_module_1.CostCenterModule,
            company_module_1.CompanyModule,
            bank_module_1.BankModule,
            site_module_1.SiteModule,
            payroll_module_1.PayrollModule,
            mail_module_1.MailModule,
            calendar_module_1.CalendarModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map