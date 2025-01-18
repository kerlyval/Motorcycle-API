import { Router } from 'express';
import { RepairController } from './controller';
import { RepairService } from '../services/repair.service';

export class RepairRoutes {
	static get routes(): Router {
		const router = Router();

		const repairService = new RepairService();
		const repairController = new RepairController(repairService);

		router.get('/', repairController.findAllRepairs);
		router.post('/', repairController.createRepair);
		router.get('/:id', repairController.findOneRepair);
		router.patch('/:id', repairController.updateRepair);
		router.delete('/:id', repairController.deleteRepair);

		return router;
	}
}
