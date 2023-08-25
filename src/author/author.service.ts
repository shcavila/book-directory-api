import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorModel } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: AuthorModel) {}
  async create(author: CreateAuthorInput): Promise<Author> {
    const newAuthor = new this.authorModel(author);
    return newAuthor.save();
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<Author> {
    return this.authorModel.findById(id).exec();
  }

  async update(id: string, updateAuthorInput: UpdateAuthorInput) {
    return this.authorModel.findByIdAndUpdate(id, updateAuthorInput).exec();
  }

  async delete(id: string) {
    return this.authorModel.findByIdAndRemove(id).exec();
  }
  async deleteAll() {
    return (await this.authorModel.deleteMany().exec()).deletedCount;
  }
}
