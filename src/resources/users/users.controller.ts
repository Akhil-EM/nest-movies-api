import { Controller, Post, Body, UseGuards, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { responseModel } from 'src/common/helpers/response-model';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('logout')
  logout(@Req() req: Request | any) {
    return this.usersService.logout(req.token);
  }
}
