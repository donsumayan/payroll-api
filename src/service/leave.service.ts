import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LeaveLogsEntity } from '../entity/employee/leave-log.entity';
import { CoreService } from './core.service';

@Injectable()
export class LeaveService extends CoreService<LeaveLogsEntity> {
  constructor(
    @InjectRepository(LeaveLogsEntity)
    readonly leaveLogRepository: Repository<LeaveLogsEntity>
  ) {
    super(leaveLogRepository);
  }

  async getByEmployeeOnDate(
    employeeId: string,
    date: string
  ): Promise<LeaveLogsEntity> {
    try {
      const data = await this.repository
        .createQueryBuilder('leavelogs')
        .where(
          'leavelogs.employee = :employeeId AND (leavelogs.start <= :date AND leavelogs.end >= :date)',
          { employeeId, date }
        )
        .getOne();
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
