import { Injectable } from '@nestjs/common';

import { Book, BookModel } from './entities/book.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: BookModel) {}
  async create(book: CreateBookInput): Promise<Book> {
    const newBook = new this.bookModel(book);

    const data = newBook.save();

    return data;
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async update(id: string, book: UpdateBookInput): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, book, { new: true }).exec();
  }

  async deleteAll(): Promise<number> {
    return (await this.bookModel.deleteMany().exec()).deletedCount;
  }
  async delete(id: string): Promise<string> {
    return (await this.bookModel.findByIdAndDelete(id).exec())._id.toString();
  }
}
