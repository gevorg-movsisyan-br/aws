// validation-exception.filter.ts
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { ValidationException } from '../exceptions/validation.exception';
import { GraphQLError } from 'graphql';

@Catch(ValidationException)
export class ValidationExceptionFilter implements GqlExceptionFilter {
  catch(exception: ValidationException) {
    const validationErrors = exception.getResponse() as ValidationError[];

    const errors = this.transformValidationErrors(validationErrors);

    return new GraphQLError(ValidationException.name, {
      extensions: {
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        errors,
      },
    });
  }

  transformValidationErrors(validationErrors: ValidationError[]) {
    const errors = {};

    validationErrors.forEach((validationError) => {
      const { property, constraints, children } = validationError;

      if (children && children.length) {
        errors[property] = this.transformValidationErrors(children);
      } else if (constraints) {
        errors[property] = Object.values(constraints);
      }
    });

    return errors;
  }
}
