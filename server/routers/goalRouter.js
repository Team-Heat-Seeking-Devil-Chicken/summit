//router boilerplate
const express = require('express');
const goalRouter = express.Router();
const taskRouter = require('./taskRouter');
const app = express();
app.use('/goal/task', taskRouter);

const goalController = require('../controllers/goalController');

// Works
goalRouter.get('/allGoals', goalController.getAllGoals, (req, res, next) => {
  return res.status(200).json(res.locals.allGoals);
});

// Error: unathorized
goalRouter.get('/goal', goalController.getUserGoals, (req, res, next) => {
  return res.status(200).json(res.locals.userGoals);
});

//Works
goalRouter.post('/goal', goalController.createGoal, (req, res, next) => {
  return res.status(200).json(res.locals.newGoal);
});

goalRouter.patch('/goal/:id', goalController.updateGoal, (req, res, next) => {
  return res.status(200).json(res.locals.updatedGoal);
});

goalRouter.delete('/goal/:id', goalController.deleteGoal, (req, res, next) => {
  return res.status(200).json(res.locals.deletedGoal);
});

module.exports = goalRouter;
