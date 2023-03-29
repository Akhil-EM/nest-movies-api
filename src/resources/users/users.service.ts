import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserType } from 'src/common/database/entities/user-type.entity';
import { User } from 'src/common/database/entities/user.entity';
import { responseModel } from 'src/common/helpers/response-model';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import {
  comparePassword,
  generateJwtToken,
  generatePasswordHash,
} from '../../common/helpers/encryption.helper';
import { TokenType } from 'src/common/database/entities/token-type.entity';
import { Token } from 'src/common/database/entities/token.entity';
@Injectable()
export class UsersService {
  async register(registerUser: RegisterUserDto): Promise<any> {
    try {
      const emailCheck = await User.findOne({
        where: {
          user_email: registerUser.email,
        },
      });

      if (emailCheck) {
        throw new HttpException(
          'this email already registered',
          HttpStatus.CONFLICT,
        );
      }

      const { user_type_id } = await UserType.findOne({
        where: {
          user_type: 'USER',
        },
      });

      const passwordHash = await generatePasswordHash(registerUser.password);
      await User.create({
        name: registerUser.name,
        user_email: registerUser.email,
        user_password: passwordHash,
        user_type_id,
      });
      return responseModel('user registration completed.');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    try {
      //check user exists
      const userCheck = await User.findOne({
        where: {
          user_email: loginUserDto.email,
        },
      });
      if (!userCheck) {
        throw new HttpException(
          'email not registered with us',
          HttpStatus.NOT_FOUND,
        );
      }
      //compare passwords
      const passwordCheck = await comparePassword(
        loginUserDto.password,
        userCheck.user_password,
      );
      if (!passwordCheck) {
        throw new HttpException('invalid password', HttpStatus.UNAUTHORIZED);
      }

      //check account active
      if (!userCheck.user_active) {
        throw new HttpException(
          'account is not active.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      //generate jwt token and send to user

      const { token_type_id } = await TokenType.findOne({
        where: {
          token_type: 'AUTH_TOKEN',
        },
      });

      const token = await generateJwtToken(
        {
          userId: userCheck.user_id,
          role: 'user',
        },
        null,
      );

      await Token.create({
        token_type_id,
        token,
        user_id: userCheck.user_id,
      });

      return responseModel('user login success', { token });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async logout(token: string): Promise<any> {
    try {
      await Token.destroy({
        where: {
          token,
        },
      });
      return responseModel('user logout success');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
