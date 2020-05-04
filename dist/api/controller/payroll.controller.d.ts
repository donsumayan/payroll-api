import { ResponseDTO } from '../dto/response.dto';
import { EmployeeService } from '../service/employee.service';
import { PayrollComputationService } from '../service/payroll-computation.service';
export declare class PayrollController {
    private readonly payrollComputationService;
    private readonly employeeService;
    constructor(payrollComputationService: PayrollComputationService, employeeService: EmployeeService);
    getByEmployee(id: string, dateFrom: string, dateTo: string): Promise<ResponseDTO<{
        employee: import("../entity/employee/employee.entity").EmployeeEntity;
        timelogs: import("../service/timelog.service").TimelogCollection;
        hoursRendered: import("../service/payroll-computation.service").DayTypePay[];
        totals: {
            contributions: {
                [key: string]: import("../service/government-references.service").DeductionShare;
            };
            deMinimisBenefits: {
                list: any[];
                total: number;
            };
            grossIncome: number;
            deductions: number;
            netIncome: number;
            totalContributions: number;
            taxableIncome: number;
            withholdingTax: number;
        };
        regDaily: number;
        regHourly: number;
        workDaysPerYear: number;
        workHrsPerDay: number;
    }>>;
}
