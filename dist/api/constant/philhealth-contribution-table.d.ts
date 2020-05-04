export interface PhilHealthBracket {
    lowerLimit: number;
    upperLimit: number | 'Infinity';
    monthlyPremium: number;
    rate: number;
    fixedContribution: number;
}
export declare const PHILHEALTH_CONTRIBUTION_TABLE: PhilHealthBracket[];
