import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsEmpty } from 'class-validator';
export class RegisterUserDto {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @MinLength(5)
  public password: string;

  @ApiProperty()
  @MinLength(3)
  public name: string;
}
