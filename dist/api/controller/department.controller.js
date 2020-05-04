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
const api_features_1 = require("../constant/api-features");
const action_decorators_1 = require("../decorators/action.decorators");
const department_service_1 = require("../service/department.service");
const base_controller_1 = require("./base.controller");
let DepartmentController = class DepartmentController extends base_controller_1.BaseController {
    constructor(departmentService) {
        super(departmentService);
        this.departmentService = departmentService;
    }
};
DepartmentController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    action_decorators_1.Feature(api_features_1.ACCESS.DEPARTMENTS),
    common_1.Controller('department'),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentController);
exports.DepartmentController = DepartmentController;
//# sourceMappingURL=department.controller.js.map