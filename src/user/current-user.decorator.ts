import { get } from 'lodash';
import { createParamDecorator, NotFoundException, HttpException } from '@nestjs/common';
import { User } from './user.entity';

export const GQLCurrentUser = createParamDecorator( (data, [root, args, ctx, info]) => ctx.user, );

export const CurrentUser = createParamDecorator(async (data, req) => {
  if (req.user) {
    return req.user;
  }
  throw new NotFoundException('No user found in request');
});
