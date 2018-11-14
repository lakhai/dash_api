import { get } from 'lodash';
import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const CurrentUser = createParamDecorator(async (data, req) => {
  const userId = get(req, 'user.id', null);
  const user = await User.findOne(userId);
  return user;
});
