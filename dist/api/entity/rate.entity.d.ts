import { BaseEntity } from './base.entity';
import { RateTableEntity } from './rate-table.entity';
export declare class RateEntity extends BaseEntity {
    name: string;
    regular: number;
    overtime: number;
    nightDiff: number;
    nightDiffOT: number;
    type: string;
    rateTable: RateTableEntity;
}
