import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';


@Table({
	timestamps: false,
	freezeTableName: true,
})


export class servicetypes_svt extends Model<servicetypes_svt>
{

	@PrimaryKey
	@Column
	SVT_ID: number;

	@Column
	RTE_ID: number;

	@Column
	SVT_NAME: string;
}
