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
const adjustment_type_controller_1 = require("../controller/adjustment-type.controller");
const company_adjustment_controller_1 = require("../controller/company-adjustment.controller");
const company_controller_1 = require("../controller/company.controller");
const income_source_controller_1 = require("../controller/income-source.controller");
const rate_tables_controller_1 = require("../controller/rate-tables.controller");
const adjustment_type_entity_1 = require("../entity/company/adjustment/adjustment-type.entity");
const company_adjustment_entity_1 = require("../entity/company/adjustment/company-adjustment.entity");
const company_entity_1 = require("../entity/company/company.entity");
const income_source_entity_1 = require("../entity/company/income-source.entity");
const rate_table_entity_1 = require("../entity/rate-table.entity");
const rate_entity_1 = require("../entity/rate.entity");
const adjustment_type_service_1 = require("../service/adjustment-type.service");
const company_adjustment_service_1 = require("../service/company-adjustment.service");
const company_service_1 = require("../service/company.service");
const income_source_service_1 = require("../service/income-source.service");
const rate_tables_service_1 = require("../service/rate-tables.service");
let CompanyModule = class CompanyModule {
};
CompanyModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                company_entity_1.CompanyEntity,
                rate_entity_1.RateEntity,
                rate_table_entity_1.RateTableEntity,
                income_source_entity_1.IncomeSourceEntity,
                company_adjustment_entity_1.CompanyAdjustmentEntity,
                adjustment_type_entity_1.AdjustmentTypeEntity,
            ]),
        ],
        controllers: [
            company_controller_1.CompanyController,
            rate_tables_controller_1.RateTablesController,
            income_source_controller_1.IncomeSourceController,
            company_adjustment_controller_1.CompanyAdjustmentController,
            adjustment_type_controller_1.AdjustmentTypeController,
        ],
        providers: [
            company_service_1.CompanyService,
            rate_tables_service_1.RateTableService,
            income_source_service_1.IncomeSourceService,
            company_adjustment_service_1.CompanyAdjustmentService,
            adjustment_type_service_1.AdjustmentTypeService,
        ],
        exports: [company_service_1.CompanyService],
    })
], CompanyModule);
exports.CompanyModule = CompanyModule;
//# sourceMappingURL=company.module.js.map