import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { GenreService } from './genre.service';
import { GenreResponse } from './entities/genre.entity';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';

@Resolver(() => GenreResponse)
export class GenreResolver {
  constructor(private readonly genreService: GenreService) {}

  @Mutation(() => GenreResponse)
  createGenre(@Args('createGenreInput') createGenreInput: CreateGenreInput) {
    return this.genreService.create(createGenreInput);
  }

  @Query(() => [GenreResponse], { name: 'genre' })
  findAll() {
    return this.genreService.findAll();
  }

  @Query(() => GenreResponse, { name: 'genre' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.genreService.findOne(id);
  }

  @Mutation(() => GenreResponse)
  updateGenre(@Args('updateGenreInput') updateGenreInput: UpdateGenreInput) {
    return this.genreService.update(updateGenreInput.id, updateGenreInput);
  }

  @Mutation(() => GenreResponse)
  removeGenre(@Args('id', { type: () => ID }) id: string) {
    return this.genreService.remove(id);
  }
}
