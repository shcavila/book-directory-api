import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { AuthorResponse } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Resolver(() => AuthorResponse)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => AuthorResponse)
  async createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return await this.authorService.create(createAuthorInput);
  }

  @Query(() => [AuthorResponse], { name: 'author' })
  async findAll() {
    return await this.authorService.findAll();
  }

  @Query(() => AuthorResponse, { name: 'author' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.authorService.findOne(id);
  }

  @Mutation(() => AuthorResponse)
  async updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
  ) {
    return await this.authorService.update(
      updateAuthorInput.id,
      updateAuthorInput,
    );
  }

  @Mutation(() => AuthorResponse)
  async deleteAuthor(@Args('id', { type: () => ID }) id: string) {
    return await this.authorService.delete(id);
  }

  @Mutation(() => Int)
  async deleteAllAuthor() {
    return await this.authorService.deleteAll();
  }
}
