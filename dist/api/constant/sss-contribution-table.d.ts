export interface SSSContributionBracket {
    lowerLimit: number;
    upperLimit: number | 'Infinity';
    msc: number;
    ssEr: number;
    ssEe: number;
    ecEr: number;
    totalEr: number;
    totalEe: number;
    total: number;
}
export declare const SSS_CONTRIBUTION_TABLE: ({
    lowerLimit: number;
    upperLimit: number;
    msc: number;
    ssEr: number;
    ssEe: number;
    ecEr: number;
    totalEr: number;
    totalEe: number;
    total: number;
} | {
    lowerLimit: number;
    upperLimit: string;
    msc: number;
    ssEr: number;
    ssEe: number;
    ecEr: number;
    totalEr: number;
    totalEe: number;
    total: number;
})[];
