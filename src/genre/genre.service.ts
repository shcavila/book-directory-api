import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Genre, GenreModel } from './entities/genre.entity';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';

@Injectable()
export class GenreService {
  constructor(@InjectModel(Genre.name) private genreModel: GenreModel) {}
  async create(createCategoryInput: CreateGenreInput): Promise<Genre> {
    const newCategory = new this.genreModel(createCategoryInput);

    const data = newCategory.save();
    return data;
  }

  async findAll(): Promise<Genre[]> {
    return this.genreModel.find().exec();
  }

  async findOne(id: string): Promise<Genre> {
    return this.genreModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCategoryInput: UpdateGenreInput,
  ): Promise<Genre> {
    return this.genreModel.findByIdAndUpdate(id, updateCategoryInput).exec();
  }

  async remove(id: string): Promise<Genre> {
    return this.genreModel.findByIdAndDelete(id).exec();
  }

  async deleteAll(): Promise<number> {
    return (await this.genreModel.deleteMany().exec()).deletedCount;
  }
}
