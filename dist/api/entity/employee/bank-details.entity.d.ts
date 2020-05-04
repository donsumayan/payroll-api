import { BankAccountType } from '../../constant/bank-acct-type';
import { BaseEntity } from '../base.entity';
import { EmployeeEntity } from './employee.entity';
export declare class BankDetailsEntity extends BaseEntity {
    employee: EmployeeEntity;
    bank: string;
    bankAccountType: BankAccountType;
    bankAccountNumber: string;
}
