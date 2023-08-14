import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserFilter, User, UsersResponse } from './entities/user.entity';
import { OperationMessages } from '../utils/index';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UsersResponse], { name: 'users' })
  async find(
    @Args('search', { type: () => UserFilter, nullable: true })
    search?: UserFilter,
  ) {
    const data = await this.userService.find(search.filter);
    return [
      {
        data,
        message: OperationMessages.RETRIEVED,
      },
    ];
  }
}
