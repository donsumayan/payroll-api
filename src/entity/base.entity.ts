import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'CREATE_BY', update: false })
  createBy: string;

  @Column({ name: 'DRAFT_ID', nullable: true })
  draftId: string;

  @CreateDateColumn({ name: 'CREATE_TIME' })
  createTime: Date;

  @Column({ name: 'UPDATE_BY', nullable: true })
  updateBy: string;

  @UpdateDateColumn({
    name: 'UPDATE_TIME',
    nullable: true,
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    select: false,
  })
  updateTime: Date;

  @Column({ name: 'IS_DELETED', default: 0 })
  isDeleted: boolean;
}
