import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BankAccountType } from '../../constant/bank-acct-type';
import { BaseEntity } from '../base.entity';
import { EmployeeEntity } from './employee.entity';

@Entity('BANK_DETAILS')
export class BankDetailsEntity extends BaseEntity {
  @OneToOne(
    () => EmployeeEntity,
    e => e.bankDetails
  )
  @JoinColumn({ name: 'EMP_ID' })
  employee: EmployeeEntity;

  @Column({ name: 'BANK' })
  bank: string;

  @Column({
    name: 'BANK_ACCOUNT_TYPE',
    type: 'enum',
    enum: BankAccountType,
    default: BankAccountType.SAVINGS,
    nullable: true,
  })
  bankAccountType: BankAccountType;

  @Column({ name: 'BANK_ACCOUNT_NUMBER', nullable: true })
  bankAccountNumber: string;
}
