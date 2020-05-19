import { Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
  freezeTableName: true,
})
export class users_usr extends Model<users_usr> {
  @PrimaryKey
  @Column
  USR_ID: number;

  @Column
  RLE_ID: number;

  @Column
  USR_EMAIL: string;

  @Column
  USR_PASSWORD: string;

  @Column
  USR_ACTIVE: boolean;
}


@Table({
  timestamps: false,
  freezeTableName: true,
})
export class bookings_bkg extends Model<bookings_bkg> {
  @PrimaryKey
  @Column
  BKG_ID: number;

  @Column
  @ForeignKey(() => users_usr)
  USR_ID: number;

  @Column
  BKG_START_DATETIME: string;

  @Column
  BKG_END_DATETIME: string;
}
