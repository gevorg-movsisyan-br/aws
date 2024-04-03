import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data, { args }) => args[2].req.user,
);
