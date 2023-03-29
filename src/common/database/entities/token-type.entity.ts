import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { Token } from './token.entity';
@Table({ tableName: 'token_types' })
export class TokenType extends Model<TokenType> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public token_type_id: number;

  @Column({
    allowNull: false,
    unique: true,
  })
  token_type: string;
  @CreatedAt public token_type_created_at: Date;

  @UpdatedAt public token_type_updated_at: Date;

  @HasMany(() => Token)
  token: Token;
}
