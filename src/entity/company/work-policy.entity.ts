import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CompanyEntity } from './company.entity';
@Entity('WORK_POLICY')
export class WorkPolicyEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'WORK_DAYS_PER_YR', nullable: true, default: 366 })
  workDaysPerYear: number;

  @Column({ name: 'WORK_HOURS_PER_DAY', nullable: true, default: 8 })
  workHoursPerDay: number;

  @Column({ name: 'WORK_MONTHS_PER_YR', nullable: true, default: 12 })
  workMonthsPerYear: number;

  @Column({ name: 'WORK_HOURS_START', nullable: true })
  workHoursStart: string;

  @Column({ name: 'WORK_HOURS_END', nullable: true })
  workHoursEnd: string;

  @Column({ name: 'BREAK_HOURS_START', nullable: true })
  breakHoursStart: string;

  @Column({ name: 'BREAK_HOURS_END', nullable: true })
  breakHoursEnd: string;

  @Column({ name: 'NIGHT_SHIFT_WORK_HOURS_START', nullable: true })
  nightShiftWorkHoursStart: string;

  @Column({ name: 'NIGHT_SHIFT_WORK_HOURS_END', nullable: true })
  nightShiftWorkHoursEnd: string;

  @OneToOne(
    () => CompanyEntity,
    company => company.id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'COMPANY_ID' })
  company: CompanyEntity;
}
