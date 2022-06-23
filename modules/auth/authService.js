const AuthRepository = require('./authRepository');

class AuthService {
	async updateByID(pk, data) {
		return await AuthRepository.updateByID(pk, {
			FullName: data.FullName,
			Avatar: data.Avatar,
		});
	}

	async signup(data) {
		return await AuthRepository.signup({
			UserEmail: data.UserEmail,
			FullName: data.FullName,
			PhoneNumber: data.PhoneNumber,
			Gender: data.Gender,
			DateOfBirth: data.DateOfBirth,
			Role: data.Role,
			PasswordHash: data.PasswordHash,
			IsActive: data.IsActive,
			Avatar: data.Avatar,
			Description: data.Description,
			Gender: data.Gender,
		});
	}

	async signin(data) {
		return await AuthRepository.signin({
			UserEmail: data.UserEmail,
			PasswordHash: data.PasswordHash,
		});
	}
}

module.exports = new AuthService();
