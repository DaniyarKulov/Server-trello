const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка регистрации", errors });
      }
      const { email, password } = req.body;
      const emailFind = await User.findOne({ email });
      if (emailFind) {
        return res.status(400).json({ message: "Пользователь уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({
        email,
        password: hashPassword,
      });
      await user.save();
      return res.json({ message: "Пользователь зарегистрирован" });
    } catch (e) {
      res.status(400).json({ message: "Ошибка регистрации", e });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ message: `Пользователь с таким ${email} не обнаружен` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: `Введен неправильный пароль` });
      }

      const token = jwt.sign({ id: user.id }, "secret", {
        expiresIn: "24h",
      });

      return res.json({ token, email });
    } catch (e) {
      return res.status(400).json({ message: `error ${e}` });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
