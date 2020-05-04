import { IsDefined } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { TimelogType } from '../../constant/timelog-type';
import { BaseEntity } from '../base.entity';
import { SiteEntity } from '../site.entity';
import { EmployeeEntity } from './employee.entity';

@Entity('TIMELOGS')
export class TimelogEntity extends BaseEntity {
  @CreateDateColumn({ name: 'SERVER_TIME' })
  serverTime: Date;

  @Column({ name: 'CLIENT_TIME', nullable: true })
  @IsDefined()
  time: string;

  @Column({ name: 'CLIENT_DATE' })
  @IsDefined()
  date: string;

  @Column({ name: 'TYPE', type: 'enum', enum: TimelogType })
  @IsDefined()
  type: string;

  @Column({ name: 'REMARKS', nullable: true })
  @IsDefined()
  remarks: string;

  @ManyToOne(
    () => EmployeeEntity,
    employee => employee.id
  )
  @JoinColumn({ name: 'EMP_ID' })
  employee: EmployeeEntity;

  @ManyToOne(
    () => SiteEntity,
    site => site.id,
    { eager: true }
  )
  @JoinColumn({ name: 'SITE_ID' })
  site: SiteEntity;
}
