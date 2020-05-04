"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_utils_pkg_1 = require("common-utils-pkg");
const lodash_1 = require("lodash");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const XLSX = require("xlsx");
const bank_acct_type_1 = require("../constant/bank-acct-type");
const employee_entity_1 = require("../entity/employee/employee.entity");
const field_mapper_1 = require("../utils/field-mapper");
const core_service_1 = require("./core.service");
const government_references_service_1 = require("./government-references.service");
let EmployeeService = class EmployeeService extends core_service_1.CoreService {
    constructor(employeeRepository, govtRefServce) {
        super(employeeRepository);
        this.employeeRepository = employeeRepository;
        this.govtRefServce = govtRefServce;
    }
    getEmployeesWithCompleteInfo() {
        return this.repository.find({
            where: { isDeleted: 0, canCalculate: 1 },
            select: ['id', 'firstName', 'lastName', 'employeeId'],
        });
    }
    checkIfEmployeeIdExists(employeeId) {
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
    generateEmployeeId(count = 0) {
        const prefix = 'P-';
        const padded = lodash_1.padStart(`${count}`, 6, '0');
        const postfix = '';
        return prefix + padded + postfix;
    }
    async get(id) {
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
                throw new common_1.NotFoundException('Employee not found');
            }
            return employee;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    extractRow(headers) {
        return (row, colValue, colIndex) => {
            const value = colValue ? colValue : null;
            const colName = lodash_1.camelCase(headers[colIndex].replace(/ *\([^)]*\) */g, ''));
            return Object.assign(Object.assign({}, row), { [colName]: value });
        };
    }
    toEmployeeModel(employee, user) {
        const { employeeId = 0, lastName = 'Stark', firstName = 'Tony', middleName = 'A', gender = 'Male', birthDate = moment()
            .month('May')
            .day(29)
            .year(1970)
            .toDate(), civilStatus = 'Single', homeAddress = 'Long Island New York', contactNo = 123, emailAddress = 123, jobTitle = 'Genius, Playboy, Philanthropist', hireDate = moment().toDate(), tin, philHealthNo, sssNo, hdmfNo, bank, bankAccountType = bank_acct_type_1.BankAccountType.SAVINGS, bankAccountNo, minimumWageEarner, basicSalary = 0, deMinimis = 0, cola = 0, workHoursPerDay = 8, workDaysPerYear = 261, } = employee;
        const newEmp = {
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
                isMinimumWageEarner: common_utils_pkg_1.toBoolean(minimumWageEarner),
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
            leaveCredits: {},
            previousEmploymentDetails: {
                hasPreviousEmployment: false,
            },
            bankDetails: {
                bank: bank ? bank : 'BDO 2017',
                bankAccountType,
                bankAccountNumber: bankAccountNo,
            },
            companyId: user.companyId,
        };
        return field_mapper_1.FieldMapper.populateUserToFields(newEmp, { createBy: user.id });
    }
    async importFromFile(file, user) {
        const count = await this.getEmployeeCount();
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const wsname = workbook.SheetNames[0];
        const employees = workbook.Sheets[wsname];
        const employeeRows = XLSX.utils.sheet_to_json(employees, {
            header: 1,
        });
        const headers = employeeRows[0];
        let entities = [];
        employeeRows.forEach((row, index) => {
            if (index > 0) {
                const rowData = row.reduce(this.extractRow(headers), {});
                const employee = this.toEmployeeModel(rowData, user);
                const employeeId = this.generateEmployeeId(count + index);
                const employeeEntity = Object.assign(Object.assign({}, employee), { employeeId });
                entities = [...entities, employeeEntity];
            }
        });
        return this.repository.save(this.repository.create(entities));
    }
    async getList() {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
EmployeeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(employee_entity_1.EmployeeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        government_references_service_1.GovernmentReferenceService])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map