import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { SalaryDetailsEntity } from './salary-details.entity';

@Entity('EMPLOYEE_CONTRIBUTION')
export class EmployeeContributionEntity extends BaseEntity {
  @Column({ name: 'CALC_SSS', default: true })
  calcSSS: boolean;

  @Column({ name: 'EE_SSS', default: 0 })
  eeSSS: number;

  @Column({ name: 'ER_SSS', default: 0 })
  erSSS: number;

  @Column({ name: 'CALC_PHIC', default: true })
  calcPHIC: boolean;

  @Column({ name: 'EE_PHIC', default: 0 })
  eePHIC: number;

  @Column({ name: 'ER_PHIC', default: 0 })
  erPHIC: number;

  @Column({ name: 'CALC_HDMF', default: true })
  calcHDMF: boolean;

  @Column({ name: 'EE_HDMF', default: 0 })
  eeHDMF: number;

  @Column({ name: 'ER_HDMF', default: 0 })
  erHDMF: number;

  @OneToOne(
    () => SalaryDetailsEntity,
    salaryDetailsEntity => salaryDetailsEntity.id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'SALARY_DTLS_ID' })
  salaryDetails: SalaryDetailsEntity;
}
