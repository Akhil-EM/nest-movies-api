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
  HasMany,
} from 'sequelize-typescript';
import { Token } from './token.entity';
import { UserType } from './user-type.entity';
@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public user_id: number;

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

  @ForeignKey(() => UserType)
  @Column({
    allowNull: false,
  })
  user_type_id: number;

  @Column({
    allowNull: false,
    defaultValue: true,
  })
  user_active: boolean;
  @CreatedAt public user_created_at: Date;

  @UpdatedAt public user_updated_at: Date;

  @BelongsTo(() => UserType)
  userType: UserType;

  @HasMany(() => Token)
  token: Token;
}
