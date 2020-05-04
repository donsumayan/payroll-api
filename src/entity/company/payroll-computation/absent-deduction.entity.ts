import { Entity } from 'typeorm';

import { DeductionEntity } from './deduction.entity';

@Entity('ABSENT_DEDUCTION')
export class AbsentDeductionEntity extends DeductionEntity {}
