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
const base_entity_1 = require("./base.entity");
let FileEntity = class FileEntity extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ name: 'FILE_NAME' }),
    __metadata("design:type", String)
], FileEntity.prototype, "filename", void 0);
__decorate([
    typeorm_1.Column({ name: 'PATH' }),
    __metadata("design:type", String)
], FileEntity.prototype, "path", void 0);
__decorate([
    typeorm_1.Column({ name: 'MIMETYPE' }),
    __metadata("design:type", String)
], FileEntity.prototype, "mimetype", void 0);
__decorate([
    typeorm_1.Column({ name: 'ORIGINAL_NAME' }),
    __metadata("design:type", String)
], FileEntity.prototype, "originalname", void 0);
__decorate([
    typeorm_1.Column({ name: 'SIZE' }),
    __metadata("design:type", Number)
], FileEntity.prototype, "size", void 0);
FileEntity = __decorate([
    typeorm_1.Entity('FILES')
], FileEntity);
exports.FileEntity = FileEntity;
//# sourceMappingURL=file.entity.js.map