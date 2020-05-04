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
const shift_service_1 = require("../service/shift.service");
const base_controller_1 = require("./base.controller");
let ShiftController = class ShiftController extends base_controller_1.BaseController {
    constructor(service) {
        super(service);
        this.service = service;
    }
};
ShiftController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    action_decorators_1.Feature(api_features_1.ACCESS.SITES),
    common_1.Controller('shifts'),
    __metadata("design:paramtypes", [shift_service_1.ShiftService])
], ShiftController);
exports.ShiftController = ShiftController;
//# sourceMappingURL=shift.controller.js.map