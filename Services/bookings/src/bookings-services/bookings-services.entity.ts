import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
  freezeTableName: true,
})


export class bookings_x_services_bxs extends Model<bookings_x_services_bxs> {
    @PrimaryKey
    @Column
    BXS_ID: number;

    @Column
    BKG_ID: number;

    @Column
    SVC_ID: number;
}