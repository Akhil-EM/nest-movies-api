import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @MinLength(5)
  public password: string;
}
