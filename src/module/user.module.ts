import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleController } from '../controller/role.controller';
import { UserController } from '../controller/user.controller';
import { RoleRestrictionsEntity } from '../entity/role-restrictions.entity';
import { RoleEntity } from '../entity/role.entity';
import { UserEntity } from '../entity/user.entity';
import { RoleService } from '../service/role.service';
import { UserService } from '../service/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, RoleRestrictionsEntity]),
  ],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService],
  exports: [UserService, RoleService],
})
export class UserModule {}
