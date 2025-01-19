import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum StatusOfRepair {
	Pending = 'Pending',
	Completed = 'Completed',
	Cancelled = 'Cancelled',
}

@Entity()
export class Repair extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('date', {
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	date: Date;

	@Column('enum', {
		enum: StatusOfRepair,
		default: StatusOfRepair.Pending,
	})
	status: StatusOfRepair;

	@Column('varchar', {
		nullable: true,
	})
	userId: string;
}
