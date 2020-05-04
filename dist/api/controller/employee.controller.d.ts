import { ResponseDTO } from '../dto/response.dto';
import { EmployeeEntity } from '../entity/employee/employee.entity';
import { EmployeeService } from '../service/employee.service';
import { UserService } from '../service/user.service';
import { BaseController } from './base.controller';
export declare class EmployeeController extends BaseController<EmployeeEntity> {
    readonly employeeService: EmployeeService;
    readonly userService: UserService;
    constructor(employeeService: EmployeeService, userService: UserService);
    createEmployee(request: any, entity: EmployeeEntity): Promise<ResponseDTO<EmployeeEntity>>;
    validateEmployeeId(employeeId: string): Promise<ResponseDTO<{
        valid: boolean;
    }>>;
    getNextEmployeeNumber(): Promise<ResponseDTO<string>>;
    importEmployees(file: any, req: any): Promise<ResponseDTO<EmployeeEntity[]>>;
    searchEmployee(querystring: string): Promise<ResponseDTO<EmployeeEntity[]>>;
    getByPaygroup(payGroupId: string): Promise<ResponseDTO<{
        payGroupId: string;
    }>>;
    getEmployeesWithCompleteInfo(): Promise<ResponseDTO<EmployeeEntity[]>>;
}
