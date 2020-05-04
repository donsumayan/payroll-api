import { BaseEntity } from './base.entity';
export declare class ShiftEntity extends BaseEntity {
    name: string;
    description: string;
    workHrsPerDay: number;
    workHrsStart: string;
    workHrsEnd: string;
    breakHrsStart: string;
    breakHrsEnd: string;
}
