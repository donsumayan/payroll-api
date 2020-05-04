import { Entity } from 'typeorm';

import { DeductionEntity } from './deduction.entity';

@Entity('LATE_DEDUCTION')
export class LateDeductionEntity extends DeductionEntity {}
