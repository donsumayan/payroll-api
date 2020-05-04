import { Entity } from 'typeorm';

import { SignatoryEntity } from './signatory.entity';

@Entity('ADMIN_SIGNATORY')
export class AdminSignatoryEntity extends SignatoryEntity {}
