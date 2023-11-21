const fs = require("fs");
const { title } = require("process");

todos = {};

const data = {
  getAllTodos: () => {
    return todos;
  },

  deleteTodoById: (id) => {
    const deletedTodo = todos[id];
    delete todos[id];
    data.save();
    return deletedTodo;
  },

  addTodo: (title, description) => {
    if (!title || !description) {
      throw new Error("provide a title and description");
    }
    const todoId = Math.max(...Object.keys(todos).map(Number), 0) + 1;
    const addedTodo = { id: todoId, title: title, description: description };
    todos[todoId] = addedTodo;
    data.save();
    return todos;
  },

  load: () => {
    try {
      const raw = fs.readFileSync("data/todos.json");
      todos = JSON.parse(raw);
    } catch (error) {
      console.error("Error loading JSON data:", error);
    }
  },

  save: () => {
    try {
      const raw = JSON.stringify(todos, null, 2);
      fs.writeFileSync("data/todos.json", raw);
    } catch (error) {
      console.error("Error saving JSON data:", error);
    }
  },
};

module.exports = { data };
