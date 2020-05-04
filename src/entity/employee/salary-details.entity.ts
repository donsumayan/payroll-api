import { IsDefined } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { BaseEntity } from '../base.entity';
import { RateTableEntity } from '../rate-table.entity';
import { DeMinimisBenefitEntity } from './deminimis.entity';
import { EmployeeContributionEntity } from './employee-contribution.entity';
import { EmployeeEntity } from './employee.entity';

@Entity('SALARY_DETAILS')
export class SalaryDetailsEntity extends BaseEntity {
  @Column({ name: 'IS_MIN_WAGE_EARNER', default: 0 })
  @IsDefined()
  isMinimumWageEarner: boolean;

  @Column({ name: 'IS_DAILY_PAID', default: 0 })
  @IsDefined()
  isDailyPaid: boolean;

  @Column({ name: 'COLA', type: 'double', default: 0 })
  @IsDefined()
  cola: number;

  @Column({ name: 'WORK_DAYS_PER_YEAR', type: 'double', default: 0 })
  @IsDefined()
  workDaysPerYear: number;

  @Column({ name: 'BASIC_SALARY', type: 'double', default: 0 })
  @IsDefined()
  basicSalary: number;

  @OneToMany(
    () => DeMinimisBenefitEntity,
    dm => dm.salaryEntity,
    {
      eager: true,
      cascade: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  deMinimis: DeMinimisBenefitEntity[];

  @Column({
    name: 'ADDITIONAL_HDMF',
    type: 'double',
    default: 0,
    nullable: true,
  })
  additionalHdmfContribution: number;

  @ManyToOne(
    () => RateTableEntity,
    rt => rt.id,
    { eager: true }
  )
  @JoinColumn({ name: 'EMP_TABLE_ID' })
  rateTable: RateTableEntity;

  @OneToOne(
    () => EmployeeEntity,
    employee => employee.id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'EMP_ID' })
  employee: EmployeeEntity;

  @OneToOne(
    () => EmployeeContributionEntity,
    ec => ec.salaryDetails,
    {
      cascade: true,
      eager: true,
    }
  )
  contribution: EmployeeContributionEntity;
}
