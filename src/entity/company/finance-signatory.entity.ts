import { Entity } from 'typeorm';

import { SignatoryEntity } from './signatory.entity';

@Entity('FINANCE_SIGNATORY')
export class FinanceSignatoryEntity extends SignatoryEntity {}
