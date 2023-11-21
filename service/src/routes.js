const { Router } = require("express");
const { data } = require("./data.js");

const router = Router();

router.get("/", (_req, res) => {
  res.json(data.getAllTodos());
});

router.delete("/:id", (req, res) => {
  res.json(data.deleteTodoById(req.params.id));
});

router.post("/", (req, res) => {
  try {
    const { title, description } = req.body;
    res.json(data.addTodo(title, description));
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
});

module.exports = { router };
