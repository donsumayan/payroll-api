import { BaseEntity } from '../base.entity';
import { CostCenterEntity } from '../cost-center.entity';
import { DepartmentEntity } from '../department.entity';
import { PayGroupEntity } from '../pay-group.entity';
import { ShiftEntity } from '../shift.entity';
import { EmployeeEntity } from './employee.entity';
export declare class JobDetailsEntity extends BaseEntity {
    jobTitle: string;
    hireDate: string;
    employmentStatus: string;
    employee: EmployeeEntity;
    restDays: string;
    department: DepartmentEntity;
    departmentId: string;
    costCenter: CostCenterEntity;
    costCenterId: string;
    payGroup: PayGroupEntity;
    payGroupId: string;
    shift: ShiftEntity;
    shiftId: string;
}
