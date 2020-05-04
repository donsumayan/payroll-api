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
const core_1 = require("@nestjs/common/decorators/core");
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
const typeorm_1 = require("typeorm");
const Repository_1 = require("typeorm/repository/Repository");
const paginated_response_dto_1 = require("../dto/paginated-response.dto");
let CoreService = class CoreService {
    constructor(repository) {
        this.repository = repository;
    }
    async getAll(criteria) {
        try {
            const [pageItems, totalItems] = await this.repository.findAndCount(criteria);
            const { skip, take } = criteria;
            const response = {
                pageItems,
                totalItems,
                pageNo: (skip || 0) + 1,
                pageSize: +(take || 10),
            };
            return new paginated_response_dto_1.PaginatedResponseDTO(response);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async get(id, query) {
        try {
            const options = { where: { id, isDeleted: 0 } };
            if (query) {
                const { relations } = query;
                if (relations) {
                    options.relations = relations.split(',');
                }
            }
            return this.repository.findOne(options);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getList() {
        try {
            return this.repository.find({ where: { isDeleted: 0 } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async create(partialEntity) {
        try {
            const entity = this.repository.create(partialEntity);
            const errors = await class_validator_1.validate(entity);
            if (errors.length > 0) {
                throw new common_1.BadRequestException('Validation failed', errors.toString());
            }
            const savedEntity = await this.repository.save(entity);
            return savedEntity;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async update(partialEntity) {
        try {
            const { id } = partialEntity;
            const savedEntity = await this.get(id);
            const deepCopiedEntity = lodash_1.merge(savedEntity, partialEntity);
            const entity = this.repository.create(deepCopiedEntity);
            const errors = await class_validator_1.validate(entity);
            if (errors.length > 0) {
                throw new common_1.BadRequestException('Validation failed', errors.toString());
            }
            return this.repository.save(deepCopiedEntity);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async delete(idList, user) {
        try {
            const updateBy = user.id;
            const isDeleted = true;
            return this.repository.manager.transaction(async (manager) => {
                const list = idList.split(',');
                const where = { id: typeorm_1.In(list) };
                await manager
                    .createQueryBuilder()
                    .update(this.repository.target)
                    .set({ updateBy, isDeleted })
                    .where(where)
                    .execute();
                return this.repository.find({ where });
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async import(partialEntities) {
        try {
            const entities = partialEntities.map(entity => this.repository.create(entity));
            return await this.repository.save(entities);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
CoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Repository_1.Repository])
], CoreService);
exports.CoreService = CoreService;
//# sourceMappingURL=core.service.js.map