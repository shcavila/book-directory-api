import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGenreInput {
  @Field()
  name: string;
  @Field()
  description: string;
}
