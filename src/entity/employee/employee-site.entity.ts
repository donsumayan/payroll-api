import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { SiteEntity } from '../site.entity';
import { EmployeeEntity } from './employee.entity';

@Entity('EMPLOYEE_SITE')
export class EmployeeSiteEntity extends BaseEntity {
  @ManyToOne(
    () => EmployeeEntity,
    employee => employee.id
  )
  @JoinColumn({ name: 'EMP_ID' })
  employee: EmployeeEntity | string;

  @ManyToOne(
    () => SiteEntity,
    site => site.id,
    { eager: true }
  )
  @JoinColumn({ name: 'SITE_ID' })
  site: SiteEntity | string;
}
