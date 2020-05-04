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
const typeorm_1 = require("typeorm");
const action_type_1 = require("../constant/action-type");
const api_features_1 = require("../constant/api-features");
const base_entity_1 = require("./base.entity");
const role_entity_1 = require("./role.entity");
let RoleRestrictionsEntity = class RoleRestrictionsEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.ManyToOne(() => role_entity_1.RoleEntity, role => role.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'ROLE_ID' }),
    __metadata("design:type", role_entity_1.RoleEntity)
], RoleRestrictionsEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({
        name: 'FEATURE',
        type: 'enum',
        enum: api_features_1.ACCESS,
    }),
    __metadata("design:type", String)
], RoleRestrictionsEntity.prototype, "feature", void 0);
__decorate([
    typeorm_1.Column({
        name: 'ACTION',
        type: 'enum',
        enum: action_type_1.ActionType,
        default: action_type_1.ActionType.READ,
    }),
    __metadata("design:type", String)
], RoleRestrictionsEntity.prototype, "action", void 0);
RoleRestrictionsEntity = __decorate([
    typeorm_1.Entity('ROLE_RESTRICTIONS')
], RoleRestrictionsEntity);
exports.RoleRestrictionsEntity = RoleRestrictionsEntity;
//# sourceMappingURL=role-restrictions.entity.js.map