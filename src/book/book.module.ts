import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { BookSchema, Book } from './entities/book.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Genre, GenreSchema } from 'src/genre/entities/genre.entity';
import { GenreService } from 'src/genre/genre.service';
import { GenreModule } from 'src/genre/genre.module';
import { Author, AuthorSchema } from 'src/author/entities/author.entity';
import { AuthorModule } from 'src/author/author.module';
import { AuthorService } from 'src/author/author.service';

@Module({
  providers: [AuthorService, GenreService, BookService, BookResolver],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule, GenreModule, AuthorModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
      {
        name: Genre.name,
        schema: GenreSchema,
      },
      {
        name: Author.name,
        schema: AuthorSchema,
      },
    ]),
  ],
})
export class BooksModule {}
