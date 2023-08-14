import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Query(() => Auth, { name: 'auth' })
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    try {
      const [data] = await this.authService.signIn({ email });
      if (!data) {
        throw new HttpException(
          {
            message: 'User Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const is_valid = await bcrypt.compare(password, data?.password);
      if (!is_valid) {
        throw new HttpException(
          {
            message: 'Invalid Credentials',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      return {
        access_token: await this.jwtService.signAsync({
          email: data?.email,
          last_name: data.last_name,
          first_name: data.first_name,
        }),
      };
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
