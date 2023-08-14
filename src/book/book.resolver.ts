import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookFields } from './entities/book.entity';
import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { AuthGuard } from '../auth/auth.guard';
@UseGuards(AuthGuard)
@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}
  @Query(() => [BookFields], { name: 'books' })
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

  @Query(() => BookFields, { name: 'book' })
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

  @Mutation(() => BookFields)
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
  @Mutation(() => BookFields)
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
  @Mutation(() => BookFields)
  async deleteBook(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<BookFields> {
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
  @Mutation(() => BookFields)
  async deleteAll(): Promise<BookFields> {
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
}
