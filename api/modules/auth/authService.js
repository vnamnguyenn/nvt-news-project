const AuthRepository = require('./authRepository');

class AuthService {
	async signup(data) {
		return await AuthRepository.signup({
			UserEmail: data.UserEmail,
			PK: 'ACCT#' + data.UserEmail,
			SK: 'ACCT#' + data.UserEmail,
			AccountIndexId: 'ACCT_' + data.UserEmail,
			FullName: data.FullName,
			PhoneNumber: data.PhoneNumber,
			Gender: data.Gender,
			DateOfBirth: data.DateOfBirth,
			Role: data.Role,
			PasswordHash: data.PasswordHash,
			IsActive: data.IsActive,
			Avatar: data.Avatar,
			Description: data.Description,
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
