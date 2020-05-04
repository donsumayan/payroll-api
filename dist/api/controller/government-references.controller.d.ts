import { ResponseDTO } from '../dto/response.dto';
import { GovernmentReferenceService } from '../service/government-references.service';
export declare class GovernmentReferencesController {
    private readonly service;
    constructor(service: GovernmentReferenceService);
    getTaxTables(): ResponseDTO<{
        DAILY: import("../constant/withholding-tax-tables").TaxBracket[];
        MONTHLY: import("../constant/withholding-tax-tables").TaxBracket[];
        SEMI_MONTHLY: import("../constant/withholding-tax-tables").TaxBracket[];
        YEARLY: import("../constant/withholding-tax-tables").TaxBracket[];
    }>;
    PHICContributionTable(): ResponseDTO<import("../constant/philhealth-contribution-table").PhilHealthBracket[]>;
    getSSSContributionTable(): ResponseDTO<({
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
    })[]>;
    getHdmfContributionTable(): ResponseDTO<(string | number)[][]>;
    calculateContributions(basicSalary: number): ResponseDTO<{
        HDMF: import("../service/government-references.service").DeductionShare;
        PHIC: import("../service/government-references.service").DeductionShare;
        SSS: import("../service/government-references.service").DeductionShare;
        totals: import("../service/government-references.service").DeductionShare;
    }>;
}
