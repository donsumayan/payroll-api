import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { EmployeeSiteEntity } from '../entity/employee/employee-site.entity';
import { CoreService } from './core.service';

@Injectable()
export class EmployeeSiteService extends CoreService<EmployeeSiteEntity> {
  constructor(
    @InjectRepository(EmployeeSiteEntity)
    readonly employeeSiteRepository: Repository<EmployeeSiteEntity>
  ) {
    super(employeeSiteRepository);
  }

  async getByEmployeeAndSite(
    employee: any,
    site: any
  ): Promise<EmployeeSiteEntity> {
    try {
      const employeeSite = await this.repository.findOneOrFail({
        where: { employee, site, isDeleted: 0 },
      });
      return employeeSite;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('User is not assigned to this site');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async getEmployeesBySite(site: any): Promise<EmployeeSiteEntity[]> {
    try {
      const employees = await this.repository.find({
        where: { site, isDeleted: 0 },
      });
      return employees;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
