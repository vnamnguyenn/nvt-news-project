const AuthService = require(`./authService`);
const jwt = require('jsonwebtoken');

class AuthController {
	async signup(req, res) {
		try {
			const data = await AuthService.signup(req.body);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async signin(req, res) {
		try {
			const data = await AuthService.signin(req.body);
			const accessToken = jwt.sign(
				{
					pk: data.Items[0].PK,
					accountId: data.Items[0].AccountId,
					isAdmin: data.Items[0].isAdmin,
				},
				process.env.JWT_SECRET,
				{expiresIn: '3d'},
			);
			const exportData = {
				AccountId: data.Items[0].AccountId,
				FullName: data.Items[0].FullName,
				UserEmail: data.Items[0].UserEmail,
				Avatar: data.Items[0].Avatar,
				isAdmin: data.Items[0].isAdmin,
			};
			res.status(200).json({
				success: true,
				message: 'User logged in successfully',
				exportData,
				accessToken,
			});
		} catch (err) {
			console.error(err);
			res
				.status(500)
				.json({success: false, message: 'Incorrect username or password, Internal server error'});
		}
	}
}

module.exports = new AuthController();
