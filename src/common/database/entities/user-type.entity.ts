import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { User } from './user.entity';
@Table({ tableName: 'user_types' })
export class UserType extends Model<UserType> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public user_type_id: number;

  @Column({
    allowNull: false,
    unique: true,
  })
  user_type: string;
  @CreatedAt public user_type_created_at: Date;

  @UpdatedAt public user_type_updated_at: Date;
  @HasMany(() => User)
  user: User;
}
