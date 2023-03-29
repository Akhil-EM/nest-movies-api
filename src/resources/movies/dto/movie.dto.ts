import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate } from 'class-validator';
export class MovieDto {
  @ApiProperty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsString()
  public director: string;

  @ApiProperty()
  @IsString()
  public releaseDate: string;

  @ApiProperty()
  @IsNumber()
  public rating: number;
}
