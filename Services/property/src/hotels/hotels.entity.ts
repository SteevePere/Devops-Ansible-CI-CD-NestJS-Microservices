import { Column, Model, PrimaryKey, AutoIncrement, Table } from 'sequelize-typescript';


@Table({
	timestamps: false,
	freezeTableName: true,
})


export class hotels_htl extends Model<hotels_htl>
{

	@PrimaryKey
	@AutoIncrement
	@Column
	HTL_ID: number;

	@Column
	HTL_ADDRESS: string;

	@Column
	HTL_PHONE_NUMBER: string;
}
