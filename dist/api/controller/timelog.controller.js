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
const action_type_1 = require("../constant/action-type");
const action_decorators_1 = require("../decorators/action.decorators");
const response_dto_1 = require("../dto/response.dto");
const employee_site_service_1 = require("../service/employee-site.service");
const timelog_service_1 = require("../service/timelog.service");
const user_service_1 = require("../service/user.service");
const base_controller_1 = require("./base.controller");
let TimelogController = class TimelogController extends base_controller_1.BaseController {
    constructor(timelogService, userService, employeeSiteService) {
        super(timelogService);
        this.timelogService = timelogService;
        this.userService = userService;
        this.employeeSiteService = employeeSiteService;
    }
    async saveLog(request, body) {
        const { id } = request.user;
        const saved = await this.timelogService.saveLog(Object.assign(Object.assign({}, body), { createBy: id }));
        return new response_dto_1.ResponseDTO('Success', saved, 200);
    }
    async editlog(request, body) {
        const { id } = request.user;
        await this.timelogService.update(Object.assign(Object.assign({}, body), { createBy: id }));
        const updated = await this.timelogService.repository.findOne({
            where: {
                id: body.id,
            },
            relations: ['employee'],
        });
        return new response_dto_1.ResponseDTO('Success', updated, 200);
    }
    async save(request, type, body) {
        const { username, password } = body;
        const user = await this.userService.getByUsernameAndPassword(username, password);
        const { site } = body;
        const { employee } = user;
        await this.employeeSiteService.getByEmployeeAndSite(employee, site);
        body = Object.assign(Object.assign({}, body), { type, employee });
        return super.create(request, body);
    }
    async getListByEmployee(employeeId, dateFrom, dateTo) {
        const list = await this.timelogService.getTimelogsByEmployee(employeeId, dateFrom, dateTo);
        return new response_dto_1.ResponseDTO('Retrieved...', list, common_1.HttpStatus.OK);
    }
    async getTemplate(dateFrom, dateTo, siteId, response) {
        const workbook = await this.timelogService.generateTemplate({
            dateFrom,
            dateTo,
            siteId,
        });
        response.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename=timesheet_template.xlsx',
        });
        response.send(workbook);
    }
    async importTimeSheet(file, req) {
        const user = req.user;
        const timelogs = await this.timelogService.importFromFile(file, user);
        return new response_dto_1.ResponseDTO('Success', timelogs, common_1.HttpStatus.CREATED);
    }
};
__decorate([
    common_1.Post('/save'),
    __param(0, common_1.Req()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TimelogController.prototype, "saveLog", null);
__decorate([
    common_1.Put('/edit'),
    __param(0, common_1.Req()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TimelogController.prototype, "editlog", null);
__decorate([
    common_1.Post(':type'),
    __param(0, common_1.Req()), __param(1, common_1.Param('type')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TimelogController.prototype, "save", null);
__decorate([
    common_1.Get('employee/:employeeId'),
    action_decorators_1.Action(action_type_1.ActionType.READ),
    __param(0, common_1.Param('employeeId')),
    __param(1, common_1.Query('dateFrom')),
    __param(2, common_1.Query('dateTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TimelogController.prototype, "getListByEmployee", null);
__decorate([
    common_1.Get('template'),
    action_decorators_1.Action(action_type_1.ActionType.READ),
    __param(0, common_1.Query('dateFrom')),
    __param(1, common_1.Query('dateTo')),
    __param(2, common_1.Query('siteId')),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], TimelogController.prototype, "getTemplate", null);
__decorate([
    common_1.Post('timesheet/import'),
    action_decorators_1.Action(action_type_1.ActionType.CREATE),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TimelogController.prototype, "importTimeSheet", null);
TimelogController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Controller('timelogs'),
    __metadata("design:paramtypes", [timelog_service_1.TimelogService,
        user_service_1.UserService,
        employee_site_service_1.EmployeeSiteService])
], TimelogController);
exports.TimelogController = TimelogController;
//# sourceMappingURL=timelog.controller.js.map