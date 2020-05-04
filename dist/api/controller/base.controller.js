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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const action_type_1 = require("../constant/action-type");
const action_decorators_1 = require("../decorators/action.decorators");
const user_decorator_1 = require("../decorators/user.decorator");
const response_dto_1 = require("../dto/response.dto");
const user_entity_1 = require("../entity/user.entity");
const field_mapper_1 = require("../utils/field-mapper");
const search_criteria_util_1 = require("../utils/search-criteria-util");
class BaseController {
    constructor(baseService) {
        this.baseService = baseService;
    }
    async findAll(request) {
        const criteria = search_criteria_util_1.SearchCriteriaUtil.createCriteria(request.query);
        const paginatedList = await this.baseService.getAll(criteria);
        return new response_dto_1.ResponseDTO('Retrieved...', paginatedList, common_1.HttpStatus.OK);
    }
    async findById(id, req) {
        const entity = await this.baseService.get(id, req.query);
        return new response_dto_1.ResponseDTO('Retrieved...', entity, common_1.HttpStatus.OK);
    }
    async create(request, entity) {
        const createBy = this.preCheckRequest(request);
        const data = field_mapper_1.FieldMapper.populateUserToFields(entity, { createBy });
        const savedEntity = await this.baseService.create(data);
        return new response_dto_1.ResponseDTO('Saved Succesfully', savedEntity, common_1.HttpStatus.CREATED);
    }
    async update(request, id, entity) {
        const updateBy = this.preCheckRequest(request);
        const data = field_mapper_1.FieldMapper.populateUserToFields(entity, {
            updateBy,
        });
        data['id'] = id;
        const updatedEntity = await this.baseService.update(data);
        return new response_dto_1.ResponseDTO('Updated Succesfully', updatedEntity, common_1.HttpStatus.OK);
    }
    async deleteMultiple(user, idlist) {
        const deletedEntities = await this.baseService.delete(idlist, user);
        return new response_dto_1.ResponseDTO('Deleted Succesfully', deletedEntities, common_1.HttpStatus.OK);
    }
    async import(request, entities) {
        const createBy = this.preCheckRequest(request);
        const data = entities.map(entity => field_mapper_1.FieldMapper.populateUserToFields(entity, { createBy }));
        const savedEntities = await this.baseService.import(data);
        return new response_dto_1.ResponseDTO('Saved Succesfully', savedEntities, common_1.HttpStatus.CREATED);
    }
    preCheckRequest(request) {
        const userId = request.user.id;
        if (!userId) {
            throw new common_1.BadRequestException('User not found in header');
        }
        return userId;
    }
}
__decorate([
    common_1.Get('/list'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    action_decorators_1.Action(action_type_1.ActionType.READ),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "findById", null);
__decorate([
    common_1.Post(),
    action_decorators_1.Action(action_type_1.ActionType.CREATE),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    action_decorators_1.Action(action_type_1.ActionType.UPDATE),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, typeof (_a = typeof typeorm_1.DeepPartial !== "undefined" && typeorm_1.DeepPartial) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "update", null);
__decorate([
    common_1.Delete(),
    action_decorators_1.Action(action_type_1.ActionType.DELETE),
    __param(0, user_decorator_1.User()), __param(1, common_1.Query('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "deleteMultiple", null);
__decorate([
    common_1.Post('/import'),
    action_decorators_1.Action(action_type_1.ActionType.CREATE),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "import", null);
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map