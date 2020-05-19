import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
  freezeTableName: true,
})

export class bookings_x_rooms_bxr extends Model<bookings_x_rooms_bxr> {
    @PrimaryKey
    @Column
    BXR_ID: number;

    @Column
    BKG_ID: number;

    @Column
    ROM_ID: number;

    @Column
    BXR_OCCUPANCY: number;
}