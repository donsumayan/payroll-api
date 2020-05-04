import { CompanyEntity } from './company.entity';
export declare class WorkPolicyEntity {
    id: string;
    workDaysPerYear: number;
    workHoursPerDay: number;
    workMonthsPerYear: number;
    workHoursStart: string;
    workHoursEnd: string;
    breakHoursStart: string;
    breakHoursEnd: string;
    nightShiftWorkHoursStart: string;
    nightShiftWorkHoursEnd: string;
    company: CompanyEntity;
}
