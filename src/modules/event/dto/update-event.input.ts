import { CreateEventInput } from './create-event.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  startDate: Date;
}
