const AuthService = require(`./authService`);
const jwt = require("jsonwebtoken");
const userRepository = require("../users/userRepository");

class AuthController {
  async updateByID(req, res) {
    try {
      const data = await AuthService.updateByID(req.user.pk, req.body);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async signup(req, res) {
    try {
      const getEmail = await userRepository.findByEmail(req.body.UserEmail);
      if (getEmail.Count > 0) {
        return res.status(400).json({ message: "Email already exist" });
      }
      const data = await AuthService.signup(req.body);
      const accessToken = jwt.sign(
        {
          pk: data.PK,
          accountId: data.AccountId,
          isAdmin: data.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      const exportData = {
        AccountId: data.AccountId,
        FullName: data.FullName,
        UserEmail: data.UserEmail,
        Avatar: data.Avatar,
      };

      res.status(200).json({
        signupSuccess: true,
        message: "User signup in successfully",
        exportData,
        accessToken,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Something went wrong" });
    }
  }

  async signin(req, res) {
    try {
      const data = await AuthService.signin(req.body);
      console.log(data.Items[0]);
      const accessToken = jwt.sign(
        {
          pk: data.Items[0].PK,
          accountId: data.Items[0].AccountId,
          isAdmin: data.Items[0].isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      const exportData = {
        AccountId: data.Items[0].AccountId,
        FullName: data.Items[0].FullName,
        UserEmail: data.Items[0].UserEmail,
        Avatar: data.Items[0].Avatar,
      };

      res.status(200).json({
        loginSuccess: true,
        message: "User logged in successfully",
        exportData,
        accessToken,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Incorrect username or password, Internal server error",
      });
    }
  }
}

module.exports = new AuthController();
