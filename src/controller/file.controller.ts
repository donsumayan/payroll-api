/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

import { User } from '../decorators/user.decorator';
// import * as path from 'path';
import { ResponseDTO } from '../dto/response.dto';
import { UserEntity } from '../entity/user.entity';
import { FileService } from '../service/file.service';

const filesDir = './uploaded-files';

@UseGuards(AuthGuard('jwt'))
@Controller('file')
export class FileController {
  constructor(readonly service: FileService) {}

  /**
   * @api {post} file/upload Upload multiple files
   * @apiVersion 1.0.0
   * @apiGroup File
   *
   * @apiDescription files should be sent in multipart/form-data format
   *
   * @apiParamExample {multipart/form-data} Request-Example:
   *     {
   *       "files": []
   *     }
   *
   *
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   *
   */
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      dest: filesDir,
    })
  )
  async uploadFile(@UploadedFiles() files: any[], @Req() req: any) {
    const user = req.user as UserEntity;
    const savedFiles = await this.service.import(
      files.map(file => ({ ...file, createBy: user.id }))
    );

    return new ResponseDTO('Success', savedFiles, 200);
  }

  @Get('employee-import-sheet')
  async downloadImportSheet(@Res() res) {
    const filePath = 'import-files/Employee Import Sheet.xlsx'; // or any file format

    // Check if file specified by the filePath exists
    fs.exists(filePath, exists => {
      if (exists) {
        // Content-type is very interesting part that guarantee that
        // Web browser will handle response in an appropriate manner.
        res.writeHead(200, {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition':
            'attachment; filename=' + 'Employee Import sheet.xlsx',
        });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('ERROR File does not exist');
      }
    });
  }

  /**
   * @api {get} file/:id/details Get file details By Id
   * @apiVersion 1.0.0
   * @apiGroup File
   *
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   *
   */
  @Get(':id/details')
  async getFileDetails(@Param('id') fileId: string) {
    const file = await this.service.get(fileId);
    return new ResponseDTO('Success', file, 200);
  }

  /**
   * @api {get} file/:id Get file By Id
   * @apiVersion 1.0.0
   * @apiGroup File
   *
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   *
   */
  @Get(':id')
  async getFile(@Param('id') fileId: string, @Res() res: any) {
    try {
      const fileDetail = await this.service.get(fileId);
      res.sendFile(fileDetail.filename, { root: filesDir });
    } catch (e) {
      throw new BadRequestException('Cant retrieve file');
    }
  }

  /**
   * @api {delete} file/:id delete file details By Id
   * @apiVersion 1.0.0
   * @apiGroup File
   *
   * @apiUse AuthHeader
   * @apiUse ResponseDto
   *
   */
  @Delete(':id')
  async deleteFile(@Param('id') fileId: string, @User() user: UserEntity) {
    const fileDetail = await this.service.get(fileId);
    fs.unlink(fileDetail.path, async err => {
      if (err) {
        throw new BadRequestException(err);
      }

      const deleted = await this.service.delete(fileId, user);
      return new ResponseDTO('Success', deleted, 200);
    });
  }
}
