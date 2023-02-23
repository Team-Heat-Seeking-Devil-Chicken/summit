//router boilerplate
const express = require('express');
const goalRouter = express.Router();
const goalController = require('../controllers/goalController');

goalRouter.get('/allGoals', goalController.getAllGoals, (req, res, next) => {
  return res.status(200).json(res.locals.allGoals);
});

goalRouter.get(
  '/goal/:userID',
  goalController.getUserGoals,
  (req, res, next) => {
    return res.status(200).json(res.locals.userGoals);
  }
);

goalRouter.post(
  '/goal/:userID',
  goalController.createGoal,
  (req, res, next) => {
    return res.status(200).json(res.locals.newGoal);
  }
);

goalRouter.patch(
  '/goal/:cardID',
  goalController.updateGoal,
  (req, res, next) => {
    return res.status(200).json(res.locals.updatedGoal);
  }
);

goalRouter.delete(
  '/goal/:cardID',
  goalController.deleteGoal,
  (req, res, next) => {
    return res.status(200).json(res.locals.deletedGoal);
  }
);

module.exports = goalRouter;
