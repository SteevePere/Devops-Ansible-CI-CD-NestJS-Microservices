import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
  freezeTableName: true,
})
export class bookings_bkg extends Model<bookings_bkg> {
  @PrimaryKey
  @Column
  BKG_ID: number;

  @Column
  USR_ID: number;

  @Column
  BKG_START_DATETIME: string;

  @Column
  BKG_END_DATETIME: string;
}
