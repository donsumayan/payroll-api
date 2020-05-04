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
const payroll_runs_service_1 = require("../service/payroll-runs.service");
const base_controller_1 = require("./base.controller");
let PayrollRunsController = class PayrollRunsController extends base_controller_1.BaseController {
    constructor(service) {
        super(service);
        this.service = service;
    }
};
PayrollRunsController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    action_decorators_1.Feature(api_features_1.ACCESS.PAYROLL),
    common_1.Controller('payroll-runs'),
    __metadata("design:paramtypes", [payroll_runs_service_1.PayrollRunsService])
], PayrollRunsController);
exports.PayrollRunsController = PayrollRunsController;
//# sourceMappingURL=payroll-runs.controller.js.map