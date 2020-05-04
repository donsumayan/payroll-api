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
const EntityNotFoundError_1 = require("typeorm/error/EntityNotFoundError");
const employee_site_entity_1 = require("../entity/employee/employee-site.entity");
const core_service_1 = require("./core.service");
let EmployeeSiteService = class EmployeeSiteService extends core_service_1.CoreService {
    constructor(employeeSiteRepository) {
        super(employeeSiteRepository);
        this.employeeSiteRepository = employeeSiteRepository;
    }
    async getByEmployeeAndSite(employee, site) {
        try {
            const employeeSite = await this.repository.findOneOrFail({
                where: { employee, site, isDeleted: 0 },
            });
            return employeeSite;
        }
        catch (error) {
            if (error instanceof EntityNotFoundError_1.EntityNotFoundError) {
                throw new common_1.NotFoundException('User is not assigned to this site');
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getEmployeesBySite(site) {
        try {
            const employees = await this.repository.find({
                where: { site, isDeleted: 0 },
            });
            return employees;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
EmployeeSiteService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(employee_site_entity_1.EmployeeSiteEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeSiteService);
exports.EmployeeSiteService = EmployeeSiteService;
//# sourceMappingURL=employee-site.service.js.map