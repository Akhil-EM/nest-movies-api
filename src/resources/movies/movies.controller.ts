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

@UseGuards(AuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() movie: MovieDto, @Req() request: Request | any) {
    return this.moviesService.create(movie, request.user.userId);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() movie: MovieDto) {
    return this.moviesService.update(+id, movie);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
