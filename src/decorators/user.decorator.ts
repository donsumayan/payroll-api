import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserEntity } from '../entity/user.entity';

export const User = createParamDecorator((_: never, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as UserEntity;
});
