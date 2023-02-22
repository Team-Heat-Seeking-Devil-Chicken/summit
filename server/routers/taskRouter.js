const express = require('express');
const taskRouter = express.Router();
const taskController = require('../controllers/taskController');

taskRouter.get('/task', taskController.getUserTasks, (req, res, next) => {
  return res.status(200).json(res.locals.userTasks);
});

taskRouter.post('/task', taskController.createTask, (req, res, next) => {
  return res.status(200).json(res.locals.newTask);
});

taskRouter.patch('/task/:id', taskController.updateTask, (req, res) => {
  return res.status(200).json(res.locals.updatedTask);
});

taskRouter.delete('/task/:id', taskController.deleteTask, (req, res) => {
  return res.status(200).json(res.locals.deletedTask);
});

module.exports = taskRouter;
