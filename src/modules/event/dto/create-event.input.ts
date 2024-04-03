import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateEventInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  startDate: Date;
}
