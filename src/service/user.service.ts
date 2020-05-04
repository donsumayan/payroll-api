import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { PaginatedResponseDTO } from '../dto/paginated-response.dto';
import { EmployeeEntity } from '../entity/employee/employee.entity';
import { UserEntity } from '../entity/user.entity';
import { getPaswordHash, saltHashPassword } from '../utils/password-util';
import { CoreService } from './core.service';

@Injectable()
export class UserService extends CoreService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    readonly userRepository: Repository<UserEntity>
  ) {
    super(userRepository);
  }

  async get(id: string): Promise<UserEntity> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, salt, ...user } = await this.userRepository.findOneOrFail(
      {
        where: { id, isDeleted: 0 },
        relations: ['employee', 'roles'],
      }
    );

    return user as UserEntity;
  }

  async getAll(
    criteria: FindManyOptions<UserEntity>
  ): Promise<PaginatedResponseDTO<UserEntity>> {
    try {
      const [pageItems, totalItems] = await this.repository.findAndCount({
        ...criteria,
        relations: ['roles', 'employee'],
      });
      const { skip, take } = criteria;

      // remove password and salt from user list
      const userList = pageItems.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ password, salt, ...user }) => user as UserEntity
      );

      const response = {
        pageItems: userList,
        totalItems,
        pageNo: (skip || 0) + 1,
        pageSize: +(take || 10),
      };

      return new PaginatedResponseDTO(response);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getByUsernameAndPassword(
    username: string,
    pass: string
  ): Promise<Partial<UserEntity>> {
    try {
      const { password, salt, ...user } = await this.repository.findOne({
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
      });

      const passwordValidator = getPaswordHash(pass, salt);

      if (passwordValidator !== password) {
        throw new ForbiddenException('Your password is incorrect');
      }

      return user;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('User not found');
      }

      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new NotFoundException(error);
    }
  }

  async createUserFromEmployee(employee: EmployeeEntity, username: string) {
    const existingUser = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Username already exist');
    }

    const { lastName, birthDate, governmentNumbers } = employee;
    const { TIN } = governmentNumbers;

    const year = birthDate.getFullYear();
    const lname = lastName.toLowerCase();
    const pword = lname + year + TIN;
    const { salt, password } = saltHashPassword(pword);

    const user = await super.create({
      salt,
      password,
      username,
      employee,
      createBy: employee.createBy,
    });

    return user;
  }

  async findOne(username: string, pass: string): Promise<Partial<UserEntity>> {
    return this.getByUsernameAndPassword(username, pass);
  }

  async createUser(user: UserEntity) {
    const userEntity = this.repository.create(user);
    const newUser = await this.repository.save(userEntity);
    return newUser;
  }

  async create(partialEntity: UserEntity) {
    const saltAndPass = saltHashPassword(partialEntity.password);
    const user = await super.create({
      ...partialEntity,
      ...saltAndPass,
    });

    delete user.password;
    delete user.salt;

    return user as UserEntity;
  }

  async updatePassword(
    body: Partial<UserEntity>
  ): Promise<Partial<UserEntity>> {
    const { id, firstLogin } = body;
    const saltAndPass = saltHashPassword(body.password);
    const findOpt = { where: { id }, relations: ['roles'] };
    const user = await this.userRepository.findOneOrFail(findOpt);
    const updatedUser = this.userRepository.create({
      ...user,
      firstLogin,
      ...saltAndPass,
    });
    await this.userRepository.save(updatedUser);
    delete user.password;
    delete user.salt;
    return user;
  }
}
