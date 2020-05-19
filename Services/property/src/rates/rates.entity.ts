import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';


@Table({
	timestamps: false,
	freezeTableName: true,
})


export class rates_rte extends Model<rates_rte>
{

	@PrimaryKey
	@Column
	RTE_ID: number;

	@Column
	RTE_AMOUNT: number;
}
