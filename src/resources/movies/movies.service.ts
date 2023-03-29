import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Movie } from 'src/common/database/entities/movie.entity';
import { User } from 'src/common/database/entities/user.entity';
import { responseModel } from 'src/common/helpers/response-model';
import { MovieDto } from './dto/movie.dto';
// import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  async create(movie: MovieDto, userId: number): Promise<any> {
    try {
      await Movie.create({
        movie_title: movie.title,
        movie_director: movie.director,
        movie_rating: movie.rating,
        movie_release_date: movie.releaseDate,
        user_id: userId,
      });
      return responseModel('new movie added.');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<any> {
    try {
      const movies = await Movie.findAll({
        raw: true,
        include: {
          model: User,
          attributes: ['name'],
        },
      });
      return responseModel('movies', { movies });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const movie = await Movie.findOne({
        raw: true,
        where: {
          movie_id: id,
        },
        include: {
          model: User,
          attributes: ['name'],
        },
      });
      return responseModel('movie', { movie });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, movie: MovieDto): Promise<any> {
    try {
      await Movie.update(
        {
          movie_title: movie.title,
          movie_director: movie.director,
          movie_rating: movie.rating,
          movie_release_date: movie.releaseDate,
        },
        {
          where: {
            movie_id: id,
          },
        },
      );

      return responseModel('movie updated');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<any> {
    try {
      await Movie.destroy({
        where: {
          movie_id: id,
        },
      });
      return responseModel(`movie deleted`);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
