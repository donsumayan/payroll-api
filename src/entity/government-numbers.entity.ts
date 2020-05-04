import { Column } from 'typeorm';

import { BaseEntity } from './base.entity';

export class GovernmentNumbersEntity extends BaseEntity {
  @Column({ name: 'SSS_NUMBER', nullable: true })
  sssNumber: string;

  @Column({ name: 'PHILHEALTH_NUMBER', nullable: true })
  philHealthNumber: string;

  @Column({ name: 'TIN', nullable: true })
  TIN: string;

  @Column({ name: 'HDMF_NUMBER', nullable: true })
  hdmfNumber: string;
}
