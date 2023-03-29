import { IsEmail, MinLength, IsEmpty } from 'class-validator';
export class RegisterUserDto {
  @IsEmail()
  public email: string;

  @MinLength(5)
  public password: string;

  @MinLength(3)
  public name: string;
}
