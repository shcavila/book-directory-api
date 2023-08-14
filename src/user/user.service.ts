import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModel, UserFilterInput } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: UserModel,
  ) {}

  async onModuleInit() {
    const data = await this.findAll();
    if (!data.length) {
      const password = 'admin';
      const hash = await bcrypt.hash(
        password,
        Number(this.configService.get('SALT_ROUNDS')),
      );
      await this.create({
        email: 'admin',
        password: hash,
        first_name: 'admmin',
        last_name: '',
      });
    }
  }

  async create(user: CreateUserInput): Promise<User> {
    const newUser = new this.userModel(user);
    const data = newUser.save();
    return data;
  }
  async find(filter: UserFilterInput): Promise<User[]> {
    return this.userModel.find(filter).exec();
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
