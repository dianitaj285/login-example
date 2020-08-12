const { Router } = require("express");
const Joi = require("@hapi/joi");
const router = Router();
const { Todo } = require("../models");
const { schemaValidation } = require("../middlewares");

const todoSchema = Joi.object({ text: Joi.string().min(3).max(30).required() });

router.post("/", schemaValidation(todoSchema), (req, res) => {
  const { text } = req.body;
  const { userId } = req.session;
  Todo.create({ text, status: "pending", userId })
    .then((result) => res.send(result))
    .catch((error) => {
      res.send({ error: true, message: error.message });
    });
});

router.get("/", (req, res) => {
  const { userId } = req.session;
  Todo.findAll({ where: { userId }, raw: true })
    .then((todos) => {
      res.send(todos);
    })
    .catch((error) => {
      res.send({ error: true, message: error.message });
    });
});

router.put("/", (req, res) => {
  const { id, newStatus } = req.body;
  const { userId } = req.session;
  Todo.update({ status: newStatus }, { where: { id, userId }, returning: true })
    .then(([count, [updatedTodo]]) => {
      console.log(count);
      res.send(updatedTodo);
    })
    .catch((error) => {
      console.log(error);
      res.send({ error: true, message: error.message });
    });
});

router.delete("/", (req, res) => {
  const { id } = req.body;
  const { userId } = req.session;
  Todo.destroy({ where: { id, userId } })
    .then((result) => {
      res.send({ ok: true, count: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
