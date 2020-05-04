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
const platform_express_1 = require("@nestjs/platform-express");
const typeorm_1 = require("typeorm");
const action_type_1 = require("../constant/action-type");
const api_features_1 = require("../constant/api-features");
const action_decorators_1 = require("../decorators/action.decorators");
const response_dto_1 = require("../dto/response.dto");
const employee_entity_1 = require("../entity/employee/employee.entity");
const roles_guard_1 = require("../guards/roles.guard");
const employee_service_1 = require("../service/employee.service");
const user_service_1 = require("../service/user.service");
const base_controller_1 = require("./base.controller");
let EmployeeController = class EmployeeController extends base_controller_1.BaseController {
    constructor(employeeService, userService) {
        super(employeeService);
        this.employeeService = employeeService;
        this.userService = userService;
    }
    async createEmployee(request, entity) {
        const { companyId } = request.user;
        entity.companyId = companyId;
        return super.create(request, entity);
    }
    async validateEmployeeId(employeeId) {
        const employee = await this.employeeService.checkIfEmployeeIdExists(employeeId);
        return new response_dto_1.ResponseDTO('Saved Succesfully', { valid: !employee }, common_1.HttpStatus.CREATED);
    }
    async getNextEmployeeNumber() {
        const ctr = await this.employeeService.getEmployeeCount();
        const employeeId = this.employeeService.generateEmployeeId(ctr);
        return new response_dto_1.ResponseDTO('Success', employeeId, 200);
    }
    async importEmployees(file, req) {
        const user = req.user;
        const employeeList = await this.employeeService.importFromFile(file, user);
        return new response_dto_1.ResponseDTO('Success', employeeList, common_1.HttpStatus.CREATED);
    }
    async searchEmployee(querystring) {
        const list = await this.employeeService.repository.find({
            where: [
                { firstName: typeorm_1.Like(`%${querystring}%`), isDeleted: 0 },
                { lastName: typeorm_1.Like(`%${querystring}%`), isDeleted: 0 },
            ],
        });
        return new response_dto_1.ResponseDTO('success', list, 200);
    }
    async getByPaygroup(payGroupId) {
        return new response_dto_1.ResponseDTO('success', { payGroupId }, 200);
    }
    async getEmployeesWithCompleteInfo() {
        const list = await this.employeeService.getEmployeesWithCompleteInfo();
        return new response_dto_1.ResponseDTO('success', list, 200);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, employee_entity_1.EmployeeEntity]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "createEmployee", null);
__decorate([
    common_1.Get('validate/employee-id/:employeeId'),
    action_decorators_1.Action(action_type_1.ActionType.READ),
    __param(0, common_1.Param('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "validateEmployeeId", null);
__decorate([
    common_1.Get('generate-id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getNextEmployeeNumber", null);
__decorate([
    common_1.Post('/import'),
    action_decorators_1.Action(action_type_1.ActionType.CREATE),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "importEmployees", null);
__decorate([
    common_1.Get('search'),
    __param(0, common_1.Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "searchEmployee", null);
__decorate([
    common_1.Get('paygroup/:payGroupId'),
    __param(0, common_1.Param('payGroupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getByPaygroup", null);
__decorate([
    common_1.Get('list/with-completed-info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeesWithCompleteInfo", null);
EmployeeController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    action_decorators_1.Feature(api_features_1.ACCESS.EMPLOYEES),
    common_1.Controller('employees'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService,
        user_service_1.UserService])
], EmployeeController);
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map