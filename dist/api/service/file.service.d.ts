import { Repository } from 'typeorm';
import { FileEntity } from '../entity/file.entity';
import { CoreService } from './core.service';
export declare class FileService extends CoreService<FileEntity> {
    readonly repository: Repository<FileEntity>;
    constructor(repository: Repository<FileEntity>);
}
