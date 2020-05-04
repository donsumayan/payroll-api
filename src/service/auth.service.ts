import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../entity/user.entity';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  validateUser(username: string, pass: string): Promise<Partial<UserEntity>> {
    return this.userService.getByUsernameAndPassword(username, pass);
  }

  async login(user: UserEntity) {
    const { id, companyId } = user;
    return {
      token: this.jwtService.sign({ id, companyId }),
      ...user,
    };
  }
}
