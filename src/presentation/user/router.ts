import { Router } from 'express';
import { UserService } from '../services/user.service';
import { UserController } from './controller';

export class UserRoutes {
	static get routes(): Router {
		const router = Router();

		const userService = new UserService();
		const userController = new UserController(userService);

		router.get('/', userController.findAllUsers);
		router.post('/', userController.createUser);
		router.get('/:id', userController.findOneUser);
		router.patch('/:id', userController.updateUser);
		router.delete('/:id', userController.deleteUser);

		return router;
	}
}
