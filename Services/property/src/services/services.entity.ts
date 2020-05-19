import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';


@Table({
	timestamps: false,
	freezeTableName: true,
})


export class services_svc extends Model<services_svc>
{

	@PrimaryKey
	@Column
	SVC_ID: number;

	@Column
	SVT_ID: number;

	@Column
	HTL_ID: number;
}
