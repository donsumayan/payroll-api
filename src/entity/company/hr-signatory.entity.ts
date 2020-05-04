import { Entity } from 'typeorm';

import { SignatoryEntity } from './signatory.entity';

@Entity('HR_SIGNATORY')
export class HrSignatoryEntity extends SignatoryEntity {}
