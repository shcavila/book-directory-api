import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  title: string;
  @Prop()
  author: string;
}

@ObjectType()
export class BookFields {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field()
  author: string;
}

@ObjectType()
export class BookResponse {
  @Field()
  message: string;
  @Field(() => BookFields)
  data: BookFields;
}

@ObjectType()
export class BooksResponse {
  @Field()
  message: string;
  @Field(() => [BookFields])
  data: [BookFields];
}
export const BookSchema = SchemaFactory.createForClass(Book);
export type BookModel = Model<BookDocument>;
