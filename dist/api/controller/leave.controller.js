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
const action_decorators_1 = require("../decorators/action.decorators");
const leave_log_entity_1 = require("../entity/employee/leave-log.entity");
const leave_service_1 = require("../service/leave.service");
const base_controller_1 = require("./base.controller");
let LeaveController = class LeaveController extends base_controller_1.BaseController {
    constructor(leaveService) {
        super(leaveService);
        this.leaveService = leaveService;
    }
    createByEmployee(id, request, entity) {
        return this.create(request, Object.assign(Object.assign({}, entity), { employeeId: id }));
    }
    async updateStatus(request, id) {
        const { status } = request.query;
        if (!status) {
            throw new common_1.BadRequestException('Leave status is required');
        }
        const savedEntity = await this.leaveService.get(id);
        return this.update(request, id, Object.assign(Object.assign({}, savedEntity), { status }));
    }
};
__decorate([
    common_1.Post('employee/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Req()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, leave_log_entity_1.LeaveLogsEntity]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "createByEmployee", null);
__decorate([
    common_1.Put(':id/update-status'),
    action_decorators_1.Action(action_type_1.ActionType.UPDATE),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "updateStatus", null);
LeaveController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Controller('leave'),
    __metadata("design:paramtypes", [leave_service_1.LeaveService])
], LeaveController);
exports.LeaveController = LeaveController;
//# sourceMappingURL=leave.controller.js.map