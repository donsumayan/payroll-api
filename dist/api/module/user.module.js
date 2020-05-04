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
const role_controller_1 = require("../controller/role.controller");
const user_controller_1 = require("../controller/user.controller");
const role_restrictions_entity_1 = require("../entity/role-restrictions.entity");
const role_entity_1 = require("../entity/role.entity");
const user_entity_1 = require("../entity/user.entity");
const role_service_1 = require("../service/role.service");
const user_service_1 = require("../service/user.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, role_entity_1.RoleEntity, role_restrictions_entity_1.RoleRestrictionsEntity]),
        ],
        controllers: [user_controller_1.UserController, role_controller_1.RoleController],
        providers: [user_service_1.UserService, role_service_1.RoleService],
        exports: [user_service_1.UserService, role_service_1.RoleService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map