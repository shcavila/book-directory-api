import { InputType, Field, Int, ID } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  title: string;
  @Field(() => Int)
  year: number;
  @Field(() => Int)
  pages: number;
  @Field(() => ID, { nullable: true })
  genreId: string;
  @Field(() => ID, { nullable: true })
  authorId: string;
  @Field({ nullable: true })
  imageLink: string;
}
