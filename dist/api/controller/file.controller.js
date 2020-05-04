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
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
const user_decorator_1 = require("../decorators/user.decorator");
const response_dto_1 = require("../dto/response.dto");
const user_entity_1 = require("../entity/user.entity");
const file_service_1 = require("../service/file.service");
const filesDir = './uploaded-files';
let FileController = class FileController {
    constructor(service) {
        this.service = service;
    }
    async uploadFile(files, req) {
        const user = req.user;
        const savedFiles = await this.service.import(files.map(file => (Object.assign(Object.assign({}, file), { createBy: user.id }))));
        return new response_dto_1.ResponseDTO('Success', savedFiles, 200);
    }
    async downloadImportSheet(res) {
        const filePath = 'import-files/Employee Import Sheet.xlsx';
        fs.exists(filePath, exists => {
            if (exists) {
                res.writeHead(200, {
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment; filename=' + 'Employee Import sheet.xlsx',
                });
                fs.createReadStream(filePath).pipe(res);
            }
            else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('ERROR File does not exist');
            }
        });
    }
    async getFileDetails(fileId) {
        const file = await this.service.get(fileId);
        return new response_dto_1.ResponseDTO('Success', file, 200);
    }
    async getFile(fileId, res) {
        try {
            const fileDetail = await this.service.get(fileId);
            res.sendFile(fileDetail.filename, { root: filesDir });
        }
        catch (e) {
            throw new common_1.BadRequestException('Cant retrieve file');
        }
    }
    async deleteFile(fileId, user) {
        const fileDetail = await this.service.get(fileId);
        fs.unlink(fileDetail.path, async (err) => {
            if (err) {
                throw new common_1.BadRequestException(err);
            }
            const deleted = await this.service.delete(fileId, user);
            return new response_dto_1.ResponseDTO('Success', deleted, 200);
        });
    }
};
__decorate([
    common_1.Post('upload'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files', 20, {
        dest: filesDir,
    })),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFile", null);
__decorate([
    common_1.Get('employee-import-sheet'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "downloadImportSheet", null);
__decorate([
    common_1.Get(':id/details'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFileDetails", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFile", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteFile", null);
FileController = __decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Controller('file'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map