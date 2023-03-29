import { IsEmail, MinLength } from 'class-validator';
export class LoginUserDto {
  @IsEmail()
  public email: string;

  @MinLength(5)
  public password: string;
}
