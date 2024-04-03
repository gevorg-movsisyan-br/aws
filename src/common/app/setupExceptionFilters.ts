import { INestApplication } from '@nestjs/common';
import { ValidationExceptionFilter } from '../filters/validation-exception.filter';
import { AllExceptionsFilter } from '../filters/all-exception.filter';

export const setupExceptionFilters = (application: INestApplication) => {
  application.useGlobalFilters(
    new AllExceptionsFilter(),
    new ValidationExceptionFilter(),
  );
};
