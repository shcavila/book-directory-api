import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;
@Schema()
export class Genre {
  @Prop()
  name: string;
  @Prop()
  description: string;
}

@ObjectType()
export class GenreResponse {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  description: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
export type GenreModel = Model<GenreDocument>;
