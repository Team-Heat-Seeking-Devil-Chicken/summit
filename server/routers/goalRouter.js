//router boilerplate
const express = require('express');
const goalRouter = express.Router();
const taskRouter = require('./taskRouter');
const app = express();
app.use('/goal/task', taskRouter);

const goalController = require('../controllers/goalController');

goalRouter.get('/allGoals', goalController.getAllGoals, (req, res, next) => {
  res.status(200).json(res.locals.allGoals);
  next();
});

// has user authentication
goalRouter.get('/goal', goalController.getUserGoals, (req, res, next) => {
  res.status(200).json(res.locals.userGoals);
  next();
});

goalRouter.post('/goal', goalController.createGoal, (req, res, next) => {
  res.status(200).json(res.locals.newGoal);
  next();
});

goalRouter.patch('/goal/:id', goalController.updateGoal, (req, res) => {
  return res.status(200).json(res.locals.updatedGoal);
});

goalRouter.delete('/goal/:id', goalController.deleteGoal, (req, res) => {
  return res.sendStatus(200);
});

module.exports = goalRouter;
