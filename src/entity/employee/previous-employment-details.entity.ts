import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { EmployeeEntity } from './employee.entity';

@Entity('PREV_EMPLOYMENT_DETAILS')
export class PreviousEmploymentDetailsEntity extends BaseEntity {
  @Column({ name: 'HAS_PREV_EMPLOYMENT', default: 0 })
  hasPreviousEmployment: boolean;

  @Column({ name: 'NON_TAX_13TH_MONTH', type: 'double', nullable: true })
  nonTax13thMonth: number;

  @Column({ name: 'NON_TAX_OTHER_BONUS', type: 'double', nullable: true })
  nonTaxOtherBonus: number;

  @Column({ name: 'NON_TAX_SALARIES', type: 'double', nullable: true })
  nonTaxSalaries: number;

  @Column({ name: '13TH_MONTH', type: 'double', nullable: true })
  prev13thMonth: number;

  @Column({ name: 'OTHER_BONUS', type: 'double', nullable: true })
  otherBonus: number;

  @Column({ name: 'TAXABLE_GROSS', type: 'double', nullable: true })
  taxableGross: number;

  @Column({ name: 'TAX_WITHHELD', type: 'double', nullable: true })
  taxWithheld: number;

  @Column({ name: 'GOV_DEDUCTIONS', type: 'double', nullable: true })
  govDeductions: number;

  @Column({ name: 'DE_MINIMIS', type: 'double', nullable: true })
  deMinimis: number;

  @Column({ name: 'TAXABLE_COMPENSATION', type: 'double', nullable: true })
  taxableCompensation: number;

  @Column({ name: 'MONETIZED_LEAVE', type: 'double', nullable: true })
  monetizedLeave: number;

  @OneToOne(
    () => EmployeeEntity,
    employee => employee.id,
    {
      cascade: true,
    }
  )
  @JoinColumn({ name: 'EMP_ID' })
  employee: EmployeeEntity;
}
