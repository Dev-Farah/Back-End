const express = require('express');
const TodoController = require('../controllers/todo');
const router = express.Router();


// Create
router.post("/api/todo", TodoController.createTodo);
  
// Read
router.get("/api/todo", TodoController.getTodo);

// Update
router.put("/api/todo", TodoController.updateTodo);

// Delete
router.delete("/api/todo/:id", TodoController.deleteTodo);

// Delete All - This API is not a part of REST API as it has a different End Point
router.delete("/api/alltodos", TodoController.deleteAll);


module.exports = router;