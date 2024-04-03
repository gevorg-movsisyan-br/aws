import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseEmptyObjectPipe implements PipeTransform {
  transform(value: Record<any, any>): Record<any, any> {
    if (Object.values(value).length === 0) {
      throw new BadRequestException('The payload object is empty');
    }

    return value;
  }
}
