import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../base.entity';

@Entity('EMPLOYMENT_STATUS')
export class EmploymentStatusEntity extends BaseEntity {
  @Column({ name: 'STATUS' })
  status: string;
}
