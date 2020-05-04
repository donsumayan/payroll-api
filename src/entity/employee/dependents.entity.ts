import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EmployeeEntity } from './employee.entity';

@Entity('DEPENDENTS')
export class DependentsEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'FULL_NAME' })
  name: string;

  @Column({ name: 'DATE_OF_BIRTH' })
  birthDate: string;

  @Column({ name: 'RELATIONSHIP' })
  relationship: string;

  @ManyToOne(
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
