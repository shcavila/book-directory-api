import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  id: string;
  @Field()
  title: string;

  @Field()
  author: string;
}
