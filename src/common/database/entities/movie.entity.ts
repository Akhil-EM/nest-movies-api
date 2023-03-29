import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  IsEmail,
  Length,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.entity';
@Table({ tableName: 'movies' })
export class Movie extends Model<Movie> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public movie_id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  user_id: number;

  @Column({
    allowNull: false,
  })
  movie_title: string;

  @Column({
    allowNull: false,
  })
  movie_director: string;

  @Column({
    allowNull: false,
  })
  movie_release_date: string;

  @Column({
    allowNull: false,
    type: 'FLOAT',
  })
  movie_rating: number;

  @CreatedAt public movie_created_at: Date;

  @UpdatedAt public movie_updated_at: Date;

  @BelongsTo(() => User)
  user: User;
}
