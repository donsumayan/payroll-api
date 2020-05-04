import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ResponseDTO } from '../dto/response.dto';
import { GovernmentReferenceService } from '../service/government-references.service';

@UseGuards(AuthGuard('jwt'))
@Controller('government-references')
export class GovernmentReferencesController {
  constructor(private readonly service: GovernmentReferenceService) {}

  /**
   * @api {get} /api/government-references/withholding-tax-tables Get Witholding Tax Tables
   * @apiName Witholding Tax Tables
   * @apiGroup Government References
   *
   * @apiSuccess {string} message Status message.
   * @apiSuccess {number} code Status code.
   * @apiSuccess { WithholdingTaxTables } content Tables form daily, weekly, semi-monthly, monthly, and yearly TaxTables.
   */
  @Get('/withholding-tax-tables')
  getTaxTables() {
    const tables = this.service.getTaxTable();
    return new ResponseDTO('Success', tables, 200);
  }

  /**
   * @api {get} /api/government-references/phic-contribution-table Get PHIC Contribution Table
   * @apiName PHIC Contribution Table
   * @apiGroup Government References
   *
   * @apiSuccess {string} message Status message.
   * @apiSuccess {number} code Status code.
   * @apiSuccess { PHICContributionBracket[] } content PHIC Contribution Table.
   */
  @Get('/phic-contribution-table')
  PHICContributionTable() {
    const table = this.service.getPHICTable();
    return new ResponseDTO('Success', table, 200);
  }

  /**
   * @api {get} /api/government-references/sss-contribution-table Get SSS Contribution Table
   * @apiName SSS Contribution Table
   * @apiGroup Government References
   *
   * @apiSuccess {string} message Status message.
   * @apiSuccess {number} code Status code.
   * @apiSuccess { SSSContributionBracket[] } content  SSS Contribution Table.
   */
  @Get('/sss-contribution-table')
  getSSSContributionTable() {
    const table = this.service.getSSSTable();
    return new ResponseDTO('Success', table, 200);
  }

  /**
   * @api {get} /api/government-references/hdmf-contribution-table Get SSS Contribution Table
   * @apiName SSS Contribution Table
   * @apiGroup Government References
   *
   * @apiSuccess {string} message Status message.
   * @apiSuccess {number} code Status code.
   * @apiSuccess { SSSContributionBracket[] } content  SSS Contribution Table.
   */
  @Get('/hdmf-contribution-table')
  getHdmfContributionTable() {
    const table = this.service.getHdmfContributionTable();
    return new ResponseDTO('Success', table, 200);
  }

  /**
   * @api {post} /api/government-references/calculate-contributions Get calculations for contributions
   * @apiName Calculate Contributions
   * @apiGroup Government References
   *
   * @apiSuccess {string} message Status message.
   * @apiSuccess {number} status Status code.
   * @apiSuccess { json } Calculations
   *
   * @apiParamExample {json} Request Body:
   * {
   *   "basicSalary": number;
   * }
   *
   * @apiSuccessExample { json } Response Body:
   * {
   *   "message": string,
   *   "status": string,
   *   "content": {
   *     "tax": number,
   *     "pagibig": {
   *         "employee": number,
   *         "employer": number,
   *         "total": number
   *     },
   *     "PHIC": {
   *         "employee": number,
   *         "employer": number,
   *         "total": number
   *     },
   *     "sss": {
   *         "employee": number,
   *         "employer": number,
   *         "total": number
   *     }
   *   }
   * }
   */
  @Post('/calculate-contributions')
  calculateContributions(@Body('basicSalary') basicSalary: number) {
    const contributions = this.service.calculateContributions(basicSalary);
    return new ResponseDTO('Success', contributions, 200);
  }
}
