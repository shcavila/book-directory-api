import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookResponse } from './entities/book.entity';
import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { AuthGuard } from '../auth/auth.guard';
import { GenreResponse } from 'src/genre/entities/genre.entity';
import { GenreService } from 'src/genre/genre.service';
import { AuthorService } from 'src/author/author.service';
import { AuthorResponse } from 'src/author/entities/author.entity';
@UseGuards(AuthGuard)
@Resolver(() => BookResponse)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly genreService: GenreService,
    private readonly authorService: AuthorService,
  ) {}
  @Query(() => [BookResponse], { name: 'books' })
  async books() {
    try {
      return await this.bookService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query(() => BookResponse, { name: 'book' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    try {
      const book = await this.bookService.findOne(id);
      if (!book) {
        throw new NotFoundException(`Book with ${id} does not exist.`);
      }
      return book;
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Mutation(() => BookResponse)
  async createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    try {
      return await this.bookService.create(createBookInput);
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Mutation(() => BookResponse)
  async updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    try {
      return await this.bookService.update(updateBookInput.id, updateBookInput);
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Mutation(() => BookResponse)
  async deleteBook(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<string> {
    try {
      return await this.bookService.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Mutation(() => Int)
  async deleteAllBook(): Promise<number> {
    try {
      return await this.bookService.deleteAll();
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @ResolveField('genre', () => GenreResponse)
  async getGenre(@Parent() book: BookResponse) {
    const { genreId } = book;
    return this.genreService.findOne(genreId);
  }

  @ResolveField('author', () => AuthorResponse)
  async getAuthor(@Parent() book: BookResponse) {
    const { authorId } = book;
    return this.authorService.findOne(authorId);
  }
}
