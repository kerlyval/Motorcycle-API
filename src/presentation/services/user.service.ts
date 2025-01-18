import { Status, User } from '../../data';
import { CustomError } from '../../domain';

export class UserService {
	constructor() {}

	async findUsers() {
		try {
			return await User.find();
		} catch (error) {
			throw CustomError.internalServer('Error getting the User');
		}
	}
	async findOneUser(id: string) {
		const user = await User.findOne({
			where: {
				id,
				status: Status.Available,
			},
		});
		if (!user) {
			throw CustomError.notFound('User not found');
		}
		return user;
	}

	async createUser(userData: any) {
		const user = new User();

		user.name = userData.name;
		user.email = userData.email;
		user.password = userData.password;
		user.role = userData.role;
		user.status = userData.status;

		try {
			return await user.save();
		} catch (error) {
			throw CustomError.internalServer('Error creating User');
		}
	}

	async updateUser(id: string, userData: any) {
		const user = await this.findOneUser(id);

		user.name = userData.name.toLowerCase().trim();
		user.email = userData.email.toLowerCase().trim();

		try {
			return await user.save();
		} catch (error) {
			throw CustomError.internalServer('Error updating User');
		}
	}

	async deleteUser(id: string) {
		const user = await this.findOneUser(id);

		console.log('delete', user);
		user.status = Status.Disabled;

		try {
			return await user.save();
		} catch (error) {
			throw CustomError.internalServer('Error deleting post');
		}
	}
}
