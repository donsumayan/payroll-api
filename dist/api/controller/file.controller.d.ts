import { ResponseDTO } from '../dto/response.dto';
import { UserEntity } from '../entity/user.entity';
import { FileService } from '../service/file.service';
export declare class FileController {
    readonly service: FileService;
    constructor(service: FileService);
    uploadFile(files: any[], req: any): Promise<ResponseDTO<import("../entity/file.entity").FileEntity[]>>;
    downloadImportSheet(res: any): Promise<void>;
    getFileDetails(fileId: string): Promise<ResponseDTO<import("../entity/file.entity").FileEntity>>;
    getFile(fileId: string, res: any): Promise<void>;
    deleteFile(fileId: string, user: UserEntity): Promise<void>;
}
