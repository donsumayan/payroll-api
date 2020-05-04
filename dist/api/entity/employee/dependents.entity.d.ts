import { EmployeeEntity } from './employee.entity';
export declare class DependentsEntity {
    id: string;
    name: string;
    birthDate: string;
    relationship: string;
    employee: EmployeeEntity;
}
