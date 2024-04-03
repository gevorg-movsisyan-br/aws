import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';

export const setupPipes = (application: INestApplication) => {
  application.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new ValidationException(errors),
    }),
  );
};
