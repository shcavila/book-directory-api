import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Model, HydratedDocument } from 'mongoose';
import { Author, AuthorResponse } from 'src/author/entities/author.entity';

import { Genre, GenreResponse } from 'src/genre/entities/genre.entity';
export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  title: string;
  @Prop(() => Int)
  year: number;
  @Prop(() => Int)
  pages: number;
  @Prop()
  imageLink: string;
  @Prop(() => ID)
  authorId: string;
  @Prop(() => ID)
  genreId: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    nullable: true,
  })
  genre: Genre;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    nullable: true,
  })
  author: Author;
}

@ObjectType()
export class BookResponse {
  @Field(() => ID)
  id: string;
  @Field()
  title: string;
  @Field(() => Int)
  year: number;
  @Field(() => Int)
  pages: number;
  @Field({ nullable: true })
  imageLink: string;
  @Field(() => ID, { nullable: true })
  genreId: string;
  @Field(() => ID, { nullable: true })
  authorId: string;
  @Field()
  genre: GenreResponse;
  @Field()
  author: AuthorResponse;
}

export const BookSchema = SchemaFactory.createForClass(Book);
export type BookModel = Model<BookDocument>;

//TODO continue tommorrow search for api to get book details
