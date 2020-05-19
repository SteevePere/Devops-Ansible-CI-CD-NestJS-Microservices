import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';


@Table({
	timestamps: false,
	freezeTableName: true,
})


export class rooms_rom extends Model<rooms_rom>
{

	@PrimaryKey
	@Column
	ROM_ID: number;

	@Column
	RMT_ID: number;

	@Column
	HTL_ID: number;

	@Column
	ROM_NAME: string;
}
