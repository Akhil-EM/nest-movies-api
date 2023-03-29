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
  DataType,
} from 'sequelize-typescript';
import { TokenType } from './token-type.entity';
import { User } from './user.entity';
@Table({ tableName: 'tokens' })
export class Token extends Model<Token> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public token_id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  user_id: number;

  @ForeignKey(() => TokenType)
  @Column({
    allowNull: false,
  })
  token_type_id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING(500),
  })
  token: string;
  @CreatedAt public token_created_at: Date;

  @UpdatedAt public token_updated_at: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => TokenType)
  tokenType: TokenType;
}
