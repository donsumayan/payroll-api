import { Repository } from 'typeorm';
import { EmployeeEntity } from '../entity/employee/employee.entity';
import { UserEntity } from '../entity/user.entity';
import { CoreService } from './core.service';
import { GovernmentReferenceService } from './government-references.service';
export declare class EmployeeService extends CoreService<EmployeeEntity> {
    readonly employeeRepository: Repository<EmployeeEntity>;
    private govtRefServce;
    constructor(employeeRepository: Repository<EmployeeEntity>, govtRefServce: GovernmentReferenceService);
    getEmployeesWithCompleteInfo(): any;
    checkIfEmployeeIdExists(employeeId: string): any;
    getEmployeeCount(): any;
    generateEmployeeId(count?: number): string;
    get(id: string): Promise<EmployeeEntity>;
    private extractRow;
    private toEmployeeModel;
    importFromFile(file: any, user: UserEntity): Promise<any>;
    getList(): Promise<EmployeeEntity[]>;
}
