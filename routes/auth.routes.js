const Router = require("express");
const routerRequest = new Router();
const controller = require("./authControl");
const { check } = require("express-validator");
const authMiddleware = require("../middlewaree/authMiddle");
const User = require("../models/User");

routerRequest.post(
  "/registration",
  [
    check("email", "Заполните имя пользователя").notEmpty(),
    check("password", "Пароль от 4 до 10 символов").isLength({
      min: 4,
      max: 10,
    }),
  ],
  controller.registration
);
routerRequest.post("/login", controller.login);
routerRequest.get("/auth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const token = jwt.sign({ id: user.id }, config.get("secret"), {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

routerRequest.get("/users", controller.getUsers);

// routerRequest.get("/users/:id", controller.getUser._id);

module.exports = routerRequest;
