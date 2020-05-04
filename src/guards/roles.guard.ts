import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { UserEntity } from '../entity/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const features = this.reflector.get<string[]>(
      'feature',
      context.getClass()
    );
    const actions = this.reflector.get<string[]>(
      'actions',
      context.getHandler()
    );
    if (!features || !actions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;
    for (const feature of features) {
      for (const action of actions) {
        if (user.roles[feature]) {
          const canDoAction = user.roles[feature][action];
          if (canDoAction != undefined || canDoAction !== null) {
            return canDoAction;
          }
        }
      }
    }

    return true;
  }
}
