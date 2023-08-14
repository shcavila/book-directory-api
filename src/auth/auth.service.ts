import { Injectable } from '@nestjs/common';
import { User, UserFilterInput } from 'src/user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signIn(filter: UserFilterInput): Promise<User[]> {
    return this.userService.find(filter);
  }
}
