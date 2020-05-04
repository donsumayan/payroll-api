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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const EntityNotFoundError_1 = require("typeorm/error/EntityNotFoundError");
const paginated_response_dto_1 = require("../dto/paginated-response.dto");
const user_entity_1 = require("../entity/user.entity");
const password_util_1 = require("../utils/password-util");
const core_service_1 = require("./core.service");
let UserService = class UserService extends core_service_1.CoreService {
    constructor(userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
    }
    async get(id) {
        const _a = await this.userRepository.findOneOrFail({
            where: { id, isDeleted: 0 },
            relations: ['employee', 'roles'],
        }), { password, salt } = _a, user = __rest(_a, ["password", "salt"]);
        return user;
    }
    async getAll(criteria) {
        try {
            const [pageItems, totalItems] = await this.repository.findAndCount(Object.assign(Object.assign({}, criteria), { relations: ['roles', 'employee'] }));
            const { skip, take } = criteria;
            const userList = pageItems.map((_a) => {
                var { password, salt } = _a, user = __rest(_a, ["password", "salt"]);
                return user;
            });
            const response = {
                pageItems: userList,
                totalItems,
                pageNo: (skip || 0) + 1,
                pageSize: +(take || 10),
            };
            return new paginated_response_dto_1.PaginatedResponseDTO(response);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getByUsernameAndPassword(username, pass) {
        try {
            const _a = await this.repository.findOne({
                where: { username, isDeleted: 0 },
                relations: ['roles'],
                select: [
                    'password',
                    'salt',
                    'id',
                    'firstLogin',
                    'companyId',
                    'username',
                ],
            }), { password, salt } = _a, user = __rest(_a, ["password", "salt"]);
            const passwordValidator = password_util_1.getPaswordHash(pass, salt);
            if (passwordValidator !== password) {
                throw new common_1.ForbiddenException('Your password is incorrect');
            }
            return user;
        }
        catch (error) {
            if (error instanceof EntityNotFoundError_1.EntityNotFoundError) {
                throw new common_1.NotFoundException('User not found');
            }
            if (error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.NotFoundException(error);
        }
    }
    async createUserFromEmployee(employee, username) {
        const existingUser = await this.userRepository.findOne({
            where: {
                username,
            },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Username already exist');
        }
        const { lastName, birthDate, governmentNumbers } = employee;
        const { TIN } = governmentNumbers;
        const year = birthDate.getFullYear();
        const lname = lastName.toLowerCase();
        const pword = lname + year + TIN;
        const { salt, password } = password_util_1.saltHashPassword(pword);
        const user = await super.create({
            salt,
            password,
            username,
            employee,
            createBy: employee.createBy,
        });
        return user;
    }
    async findOne(username, pass) {
        return this.getByUsernameAndPassword(username, pass);
    }
    async createUser(user) {
        const userEntity = this.repository.create(user);
        const newUser = await this.repository.save(userEntity);
        return newUser;
    }
    async create(partialEntity) {
        const saltAndPass = password_util_1.saltHashPassword(partialEntity.password);
        const user = await super.create(Object.assign(Object.assign({}, partialEntity), saltAndPass));
        delete user.password;
        delete user.salt;
        return user;
    }
    async updatePassword(body) {
        const { id, firstLogin } = body;
        const saltAndPass = password_util_1.saltHashPassword(body.password);
        const findOpt = { where: { id }, relations: ['roles'] };
        const user = await this.userRepository.findOneOrFail(findOpt);
        const updatedUser = this.userRepository.create(Object.assign(Object.assign(Object.assign({}, user), { firstLogin }), saltAndPass));
        await this.userRepository.save(updatedUser);
        delete user.password;
        delete user.salt;
        return user;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map