import { Controller, Post, Body, UseGuards, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { responseModel } from 'src/common/helpers/response-model';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOkResponse({
    description: 'user registration completed.',
  })
  @ApiConflictResponse({
    description: 'this email already registered',
  })
  @Post('register')
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }

  @ApiOkResponse({
    description: '"user login success" message with auth token',
  })
  @ApiNotFoundResponse({
    description: 'email not registered with us',
  })
  @ApiUnauthorizedResponse({
    description: '"invalid password" or "account is not active."',
  })
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @ApiOkResponse({
    description: 'user logout success',
  })
  @ApiForbiddenResponse({
    description: '"Forbidden resource" issue with access token',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Delete('logout')
  logout(@Req() req: Request | any) {
    return this.usersService.logout(req.token);
  }
}
