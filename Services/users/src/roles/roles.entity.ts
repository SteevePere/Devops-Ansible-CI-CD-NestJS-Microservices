import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
  freezeTableName: true,
})
export class roles_rle extends Model<roles_rle> {
  @PrimaryKey
  @Column
  RLE_ID: number;

  @Column
  RLE_NAME: string;
}
