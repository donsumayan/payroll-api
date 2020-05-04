import { Entity, JoinColumn, OneToOne } from 'typeorm';

import { GovernmentNumbersEntity } from '../government-numbers.entity';
import { EmployeeEntity } from './employee.entity';

@Entity('EMPLOYEE_GOVERNMENT_NUMBERS')
export class EmployeeGovernmentNumbersEntity extends GovernmentNumbersEntity {
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
}
