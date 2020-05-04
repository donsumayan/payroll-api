import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyEntity } from '../entity/company/company.entity';
import { CoreService } from './core.service';

@Injectable()
export class CompanyService extends CoreService<CompanyEntity> {
  constructor(
    @InjectRepository(CompanyEntity)
    readonly companyRepository: Repository<CompanyEntity>
  ) {
    super(companyRepository);
  }

  async get(id: string): Promise<CompanyEntity> {
    try {
      const company = await this.repository.findOne({
        where: { id, isDeleted: 0 },
        relations: [
          'governmentNumbers',
          'contact',
          'signatories',
          'workPolicy',
          'payrollComputation',
          'taxComputation',
        ],
      });
      return company;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
