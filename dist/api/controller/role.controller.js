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
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const action_type_1 = require("../constant/action-type");
const api_features_1 = require("../constant/api-features");
const action_decorators_1 = require("../decorators/action.decorators");
const response_dto_1 = require("../dto/response.dto");
const role_service_1 = require("../service/role.service");
const base_controller_1 = require("./base.controller");
let RoleController = class RoleController extends base_controller_1.BaseController {
    constructor(roleService) {
        super(roleService);
        this.roleService = roleService;
    }
    async accessTypes() {
        return new response_dto_1.ResponseDTO('Sucess', Object.values(api_features_1.ACCESS).reduce((arr, feature) => [
            ...arr,
            ...Object.values(action_type_1.ActionType).map(action => {
                const name = `${feature} - ${action}`;
                const id = `${feature}::${action}`;
                return { name, id };
            }),
        ], []), 200);
    }
};
__decorate([
    common_1.Get('access-types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "accessTypes", null);
RoleController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    action_decorators_1.Feature(api_features_1.ACCESS.ROLES),
    common_1.Controller('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map