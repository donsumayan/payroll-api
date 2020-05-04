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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payroll_runs_entity_1 = require("../entity/payroll-runs.entity");
const core_service_1 = require("./core.service");
const payroll_computation_service_1 = require("./payroll-computation.service");
const moment = require("moment");
const constants_1 = require("../constant/constants");
let PayrollRunsService = class PayrollRunsService extends core_service_1.CoreService {
    constructor(repository, computationService) {
        super(repository);
        this.repository = repository;
        this.computationService = computationService;
    }
    async get(id) {
        const payroll = await super.get(id);
        const dateFrom = moment(payroll.dateFrom, 'L').format(constants_1.QUERY_DATE_FORMAT);
        const dateTo = moment(payroll.dateTo, 'L').format(constants_1.QUERY_DATE_FORMAT);
        const payDetails = await Promise.all(payroll.employees.map(async (employee) => {
            const pay = await this.computationService.calculatePerEmployee(employee.id, dateFrom, dateTo, payroll);
            return pay;
        }));
        return Object.assign(Object.assign({}, payroll), { details: payDetails });
    }
};
PayrollRunsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(payroll_runs_entity_1.PayrollRunsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        payroll_computation_service_1.PayrollComputationService])
], PayrollRunsService);
exports.PayrollRunsService = PayrollRunsService;
//# sourceMappingURL=payroll-runs.service.js.map