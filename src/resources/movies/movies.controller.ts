import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('movies')
@UseGuards(AuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @ApiOkResponse({
    description: 'new movie added.',
  })
  @ApiBadRequestResponse({
    description: `[
      "title must be a string",
      "director must be a string",
      "releaseDate must be a string",
      "rating must be a number conforming to the specified constraints"
      ]`,
  })
  @ApiBearerAuth('access-token')
  @Post()
  create(@Body() movie: MovieDto, @Req() request: Request | any) {
    return this.moviesService.create(movie, request.user.userId);
  }

  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'array containing list of movies',
  })
  @ApiBearerAuth('access-token')
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @ApiOkResponse({
    description: 'object containing movie',
  })
  @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @ApiOkResponse({
    description: 'movie updated',
  })
  @ApiBearerAuth('access-token')
  @Patch(':id')
  update(@Param('id') id: string, @Body() movie: MovieDto) {
    return this.moviesService.update(+id, movie);
  }

  @ApiOkResponse({
    description: 'movie deleted',
  })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
