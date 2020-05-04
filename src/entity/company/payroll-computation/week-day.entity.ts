import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { JobDetailsEntity } from '../../employee/job-details.entity';
import { PayrollComputationEntity } from './payroll-computation.entity';

@Entity('WEEK_DAYS')
export class WeekDayEntity extends BaseEntity {
  @Column({ name: 'IS_SELECTED', type: 'boolean', default: false })
  isSelected: boolean;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'PARENT_ID' })
  parentId: string;
}

@Entity('WEEK_DAYS')
export class EmployeeRestDayEntity extends WeekDayEntity {
  @ManyToOne(
    () => JobDetailsEntity,
    pce => pce.id
  )
  @JoinColumn({ name: 'PARENT_ID' })
  jobDetails: JobDetailsEntity;
}

@Entity('WEEK_DAYS')
export class DefaultRestDayEntity extends WeekDayEntity {
  @ManyToOne(
    () => PayrollComputationEntity,
    pce => pce.id
  )
  @JoinColumn({ name: 'PARENT_ID' })
  payrollComputation: PayrollComputationEntity;
}
