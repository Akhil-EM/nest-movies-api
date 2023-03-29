import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  IsEmail,
  Length,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
@Table({ tableName: 'movies' })
export class Movie extends Model<Movie> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public movie_id: number;

  @IsEmail
  @Column({
    allowNull: false,
    unique: true,
  })
  user_email: string;

  @Length({ min: 5 })
  @Column({
    allowNull: false,
  })
  user_password: string;

  @Column({
    allowNull: false,
    defaultValue: true,
  })
  user_active: boolean;
  @CreatedAt public user_created_at: Date;

  @UpdatedAt public user_updated_at: Date;

  @BelongsTo(() => UserType)
  userType: UserType;
}
