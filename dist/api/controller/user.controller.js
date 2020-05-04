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
const api_features_1 = require("../constant/api-features");
const action_decorators_1 = require("../decorators/action.decorators");
const user_decorator_1 = require("../decorators/user.decorator");
const response_dto_1 = require("../dto/response.dto");
const user_entity_1 = require("../entity/user.entity");
const roles_guard_1 = require("../guards/roles.guard");
const user_service_1 = require("../service/user.service");
const base_controller_1 = require("./base.controller");
let UserController = class UserController extends base_controller_1.BaseController {
    constructor(service) {
        super(service);
        this.service = service;
    }
    async create(body, user) {
        const createdUser = await this.service.create(Object.assign(Object.assign({}, body), { companyId: user.companyId, createBy: user.id }));
        return new response_dto_1.ResponseDTO('Saved Succesfully', createdUser, common_1.HttpStatus.CREATED);
    }
    async validateEmployeeId(username) {
        const user = await this.service.userRepository.findOne({
            where: { username },
        });
        if (user) {
            throw new common_1.BadRequestException('Username is already taken');
        }
        return new response_dto_1.ResponseDTO('Success', { valid: !user }, 200);
    }
    async updatePassword(body) {
        const user = await this.service.updatePassword(body);
        return new response_dto_1.ResponseDTO('Success', user, 200);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    common_1.Get('validate/username/:username'),
    __param(0, common_1.Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateEmployeeId", null);
__decorate([
    common_1.Put('password'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
UserController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    action_decorators_1.Feature(api_features_1.ACCESS.USERS),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map