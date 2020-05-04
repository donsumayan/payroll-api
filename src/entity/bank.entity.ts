import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('BANK')
export class BankEntity extends BaseEntity {
  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'CODE' })
  code: string;

  @Column({ name: 'ACCT_NUMBER' })
  accountNumber: string;

  @Column({ name: 'COMPANY_CODE' })
  companyCode: string;

  @Column({ name: 'PRESENTING_OFFICE' })
  presentingOffice: string;

  @Column({ name: 'BRANCH_CODE' })
  branchCode: string;

  @Column({ name: 'REMARKS' })
  remarks: string;
}
