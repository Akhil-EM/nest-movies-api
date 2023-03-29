import { IsString, IsNumber, IsDate } from 'class-validator';
export class MovieDto {
  @IsString()
  public title: string;

  @IsString()
  public director: string;

  @IsString()
  public releaseDate: string;

  @IsNumber()
  public rating: number;
}
