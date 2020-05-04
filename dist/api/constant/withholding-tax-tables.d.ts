export interface TaxBracket {
    lowerLimit: number;
    upperLimit: number | 'Infinity';
    baseTax: number;
    adjustmentRate: number;
}
export declare const DAILY: TaxBracket[];
export declare const WEEKLY: TaxBracket[];
export declare const SEMI_MONTHLY: TaxBracket[];
export declare const MONTHLY: TaxBracket[];
export declare const YEARLY: TaxBracket[];
