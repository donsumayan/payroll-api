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
const day_type_1 = require("../constant/day-type");
const action_decorators_1 = require("../decorators/action.decorators");
const response_dto_1 = require("../dto/response.dto");
const rate_tables_service_1 = require("../service/rate-tables.service");
const base_controller_1 = require("./base.controller");
let RateTablesController = class RateTablesController extends base_controller_1.BaseController {
    constructor(rateTablesService) {
        super(rateTablesService);
        this.rateTablesService = rateTablesService;
    }
    getTypes() {
        return new response_dto_1.ResponseDTO('Success', Object.values(day_type_1.DayType).map((value) => ({
            name: value,
            id: value,
        })), 200);
    }
};
__decorate([
    common_1.Get('types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RateTablesController.prototype, "getTypes", null);
RateTablesController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    action_decorators_1.Feature(api_features_1.ACCESS.RATE_TABLES),
    common_1.Controller('rate-tables'),
    __metadata("design:paramtypes", [rate_tables_service_1.RateTableService])
], RateTablesController);
exports.RateTablesController = RateTablesController;
//# sourceMappingURL=rate-tables.controller.js.map