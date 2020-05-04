import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('FILES')
export class FileEntity extends BaseEntity {
  @Column({ name: 'FILE_NAME' })
  filename: string;

  @Column({ name: 'PATH' })
  path: string;

  @Column({ name: 'MIMETYPE' })
  mimetype: string;

  @Column({ name: 'ORIGINAL_NAME' })
  originalname: string;

  @Column({ name: 'SIZE' })
  size: number;
}
