import { Request } from 'express';

import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (!request.user?.id) {
      throw new BadRequestException('userId not found');
    }
    return request.user.id;
  },
);
