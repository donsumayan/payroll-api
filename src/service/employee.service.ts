/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toBoolean } from 'common-utils-pkg';
import { camelCase, padStart } from 'lodash';
import * as moment from 'moment';
import { DeepPartial, Repository } from 'typeorm';
import * as XLSX from 'xlsx';

import { BankAccountType } from '../constant/bank-acct-type';
import { EmployeeEntity } from '../entity/employee/employee.entity';
import { UserEntity } from '../entity/user.entity';
import { FieldMapper } from '../utils/field-mapper';
import { CoreService } from './core.service';
import { GovernmentReferenceService } from './government-references.service';

@Injectable()
export class EmployeeService extends CoreService<EmployeeEntity> {
  constructor(
    @InjectRepository(EmployeeEntity)
    readonly employeeRepository: Repository<EmployeeEntity>,
    private govtRefServce: GovernmentReferenceService
  ) {
    super(employeeRepository);
  }

  getEmployeesWithCompleteInfo() {
    return this.repository.find({
      where: { isDeleted: 0, canCalculate: 1 },
      select: ['id', 'firstName', 'lastName', 'employeeId'],
    });
  }

  checkIfEmployeeIdExists(employeeId: string) {
    return this.employeeRepository.findOne({
      where: {
        employeeId,
      },
    });
  }

  getEmployeeCount() {
    return this.repository.count({
      order: {
        employeeId: 'ASC',
      },
    });
  }

  generateEmployeeId(count = 0): string {
    const prefix = 'P-';
    const padded = padStart(`${count}`, 6, '0');
    const postfix = '';
    return prefix + padded + postfix;
  }

  async get(id: string): Promise<EmployeeEntity> {
    try {
      const employee = await this.repository.findOneOrFail({
        where: { id, isDeleted: 0 },
        relations: [
          'contact',
          'bankDetails',
          'salaryDetails',
          'leaveCredits',
          'governmentNumbers',
          'dependents',
          'previousEmploymentDetails',
          'company',
        ],
      });

      if (!employee) {
        throw new NotFoundException('Employee not found');
      }

      // let { salaryDetails } = employee;
      // const { basicSalary } = salaryDetails;
      // const contribution = this.govtRefServce.calculateContributions(
      //   basicSalary
      // );
      // salaryDetails = { ...salaryDetails, contribution };
      // employee = { ...employee, salaryDetails };
      return employee;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private extractRow(headers: string[]) {
    return (
      row: { [key: string]: string | number },
      colValue: string | number,
      colIndex: number
    ) => {
      const value = colValue ? colValue : null;
      const colName = camelCase(
        headers[colIndex].replace(/ *\([^)]*\) */g, '')
      );
      return {
        ...row,
        [colName]: value,
      };
    };
  }

  private toEmployeeModel(
    employee: any,
    user: UserEntity
  ): DeepPartial<EmployeeEntity> {
    const {
      employeeId = 0,
      lastName = 'Stark',
      firstName = 'Tony',
      middleName = 'A',
      gender = 'Male',
      birthDate = moment()
        .month('May')
        .day(29)
        .year(1970)
        .toDate(),
      civilStatus = 'Single',
      homeAddress = 'Long Island New York',
      contactNo = 123,
      emailAddress = 123,
      jobTitle = 'Genius, Playboy, Philanthropist',
      hireDate = moment().toDate(),
      tin,
      philHealthNo,
      sssNo,
      hdmfNo,
      bank,
      bankAccountType = BankAccountType.SAVINGS,
      bankAccountNo,
      minimumWageEarner,
      basicSalary = 0,
      deMinimis = 0,
      cola = 0,
      workHoursPerDay = 8,
      workDaysPerYear = 261,
    } = employee;

    const newEmp: DeepPartial<EmployeeEntity> = {
      // all imported employees will have missing information that will be updated individually view edit
      canCalculate: false,
      employeeId,
      lastName,
      firstName,
      middleName,
      gender,
      birthDate,
      civilStatus,
      contact: {
        homeAddress,
        emailAddress,
        contactNumber: contactNo,
      },
      salaryDetails: {
        basicSalary,
        isMinimumWageEarner: toBoolean(minimumWageEarner),
        deMinimis,
        cola,
        workDaysPerYear,
      },
      jobDetails: {
        jobTitle,
        restDays: 'Sunday,Saturday',
        hireDate: moment(new Date(hireDate)).toISOString(true),
      },
      governmentNumbers: {
        TIN: tin,
        philHealthNumber: philHealthNo,
        sssNumber: sssNo,
        hdmfNumber: hdmfNo,
      },
      leaveCredits: {
        // none
      },
      previousEmploymentDetails: {
        hasPreviousEmployment: false,
        // none
      },
      bankDetails: {
        bank: bank ? bank : 'BDO 2017',
        bankAccountType,
        bankAccountNumber: bankAccountNo,
      },
      companyId: user.companyId,
    };

    return FieldMapper.populateUserToFields(newEmp, { createBy: user.id });
  }

  async importFromFile(file: any, user: UserEntity) {
    // const data = new Uint8Array(file.buffer);

    const count = await this.getEmployeeCount();
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    /* Get first worksheet */
    const wsname = workbook.SheetNames[0];
    const employees = workbook.Sheets[wsname];

    /* Convert array of arrays */
    const employeeRows: any[][] = XLSX.utils.sheet_to_json(employees, {
      header: 1,
    });

    const headers: string[] = employeeRows[0];
    let entities: DeepPartial<EmployeeEntity>[] = [];

    employeeRows.forEach((row, index: number) => {
      if (index > 0) {
        const rowData = row.reduce(this.extractRow(headers), {});
        const employee = this.toEmployeeModel(rowData, user);
        const employeeId = this.generateEmployeeId(count + index);
        const employeeEntity = { ...employee, employeeId };
        entities = [...entities, employeeEntity as DeepPartial<EmployeeEntity>];
      }
    });

    return this.repository.save(this.repository.create(entities));
  }

  async getList(): Promise<EmployeeEntity[]> {
    try {
      return this.repository.find({
        where: { isDeleted: 0 },
        relations: [
          'contact',
          'salaryDetails',
          'leaveCredits',
          'governmentNumbers',
          'dependents',
          'previousEmploymentDetails',
          'company',
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
