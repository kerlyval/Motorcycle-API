import { Repair, StatusOfRepair } from '../../data';
import { CustomError } from '../../domain';

export class RepairService {
	constructor() {}

	async findAllRepairs() {
		try {
			return await Repair.find(); //checar esto después
		} catch (error) {
			throw CustomError.internalServer('Error getting data about the repair');
		}
	}

	async findOneRepair(id: string) {
		const repair = await Repair.findOne({
			where: {
				id,
				status: StatusOfRepair.Pending,
			},
		});

		if (!repair) {
			throw CustomError.notFound('Repair not found');
		}

		return repair;
	}

	async createRepair(repairData: any) {
		const repair = new Repair();

		repair.date = repairData.data;
		repair.status = repairData.status;

		// para Errores
		try {
			return await repair.save();
		} catch (error) {
			throw CustomError.internalServer('Error creating repair');
		}
	}

	async updateRepair(id: string, repairData: any) {
		const repair = await this.findOneRepair(id);

		repair.date = repairData.date.toLowerCase().trim();

		try {
			return await repair.save();
		} catch (error) {
			throw CustomError.internalServer('Error updating repair');
		}
	}

	async deleteRepair(id: string) {
		const repair = await this.findOneRepair(id);

		repair.status = StatusOfRepair.Pending;

		try {
			repair.save();
		} catch (error) {
			throw CustomError.internalServer('Error deleting repair');
		}
	}
}
