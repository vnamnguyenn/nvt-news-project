const AuthService = require(`./authService`);

class AuthController {
	async signup(req, res) {
		try {
			const data = await AuthService.signin(req.body);
			res.status(200).json(data);
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Something went wrong'});
		}
	}

	async signin(req, res) {
		try {
			const data = await AuthService.signin(req.body);
			res.status(200).json(data.Items[0]);
			console.log(data.Items[0])
		} catch (err) {
			console.error(err);
			res.status(500).json({err: 'Wrong username or password'});
		}
	}
}

module.exports = new AuthController();
