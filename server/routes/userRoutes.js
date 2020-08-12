const { Router } = require("express");
const Joi = require("@hapi/joi");
const { User } = require("../models");
const { schemaValidation } = require("../middlewares");
const router = Router();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(15).required(),
});

router.post("/register", schemaValidation(registerSchema), (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email }, raw: true })
    .then((user) => {
      if (user) {
        return res.status(400).send({ message: "Usuario ya existe" });
      }
      return User.create({ email, password });
    })
    .then((user) => {
      req.session.userId = user.id;
      const { password, ...rest } = user.dataValues;
      5;
      res.send(rest);
    })
    .catch((err) => res.send(err));
});

router.post("/login", schemaValidation(registerSchema), (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then((user) => {
      debugger;
      if (!user) {
        return res.status(400).send({ message: "Datos no válidos" });
      }
      return user.validatePassword(password).then((isMatch) => {
        if (isMatch) {
          req.session.userId = user.id;
          const { password, ...result } = user.dataValues;
          return res.send(result);
        }
        res.status(400).send({ message: "Datos no válidos" });
      });
    })
    .catch((err) => console.log(err));
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).end();
});

module.exports = router;
