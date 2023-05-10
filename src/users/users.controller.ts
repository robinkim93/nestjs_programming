import {
  Controller,
  Post,
  Body,
  Query,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from './users.service';
import { UserInfo } from './UserInfo';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() userDto: CreateUserDto): Promise<void> {
    const { name, email, password } = userDto;
    return this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() emailDto: VerifyEmailDto) {
    const { signupVerifyToken } = emailDto;

    await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() loginDto: UserLoginDto) {
    const { email, password } = loginDto;

    return this.usersService.login(email, password);
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    return this.usersService.getUserInfo(userId);
  }
}
