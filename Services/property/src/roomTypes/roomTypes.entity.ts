import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';


@Table({
	timestamps: false,
	freezeTableName: true,
})


export class roomtypes_rmt extends Model<roomtypes_rmt>
{

	@PrimaryKey
	@Column
	RMT_ID: number;

	@Column
	RTE_ID: number;

	@Column
	RMT_NAME: string;

	@Column
	RMT_MAX_OCCUPANCY: number;
}
