const UserRepository = require('./userRepository');

class UserService {
	async findByID(PK) {
		const data = await UserRepository.findByID(PK);

		if (data) {
			return data.Item;
		}

		return data;
	}

	async getAll() {
		const data = await UserRepository.getAll();

		if (data) {
			return data;
		}

		return data;
	}

	async create(data) {
		return await UserRepository.create({
			UserEmail: data.UserEmail,
			AccountIndexId: 'ACCT_' + data.UserEmail,
			FullName: data.FullName,
			PhoneNumber: data.PhoneNumber,
			Gender: data.Gender,
			DateOfBirth: data.DateOfBirth,
			Role: data.Role,
			PasswordHash: '1',
			IsActive: data.IsActive,
			Avatar: data.Avatar,
			Description: data.Description,
		});
	}

	async update(data) {
		return await UserRepository.update(PK, {
			Role: data.Role,
		});
	}

	async deleteByID(PK) {
		return await UserRepository.deleteByID(PK);
	}
}

module.exports = new UserService();
