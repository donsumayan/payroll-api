import { BaseEntity } from './base.entity';
export declare class FileEntity extends BaseEntity {
    filename: string;
    path: string;
    mimetype: string;
    originalname: string;
    size: number;
}
