const express = require('express');
const prisma = require('../db.js');

const sessions = new Map();

// error handling
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `goalController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    status: 400,
    message: {
      err: `goalController.${method}: ERROR: Check server logs for details`
    }
  };
};

const goalController = {
  // get an individual goal and all associated data.
  getUserGoals: async (req, res, next) => {
    try {
      // Check if session is valid and associated with user
      const session = sessions.get(req.cookies.session);
      const userId = req.query.user_id;
      console.log({ session, userId });
      if (!session) {
        res.status(401).send('Unauthorized');
        return;
      }
      if (session.userId !== Number(userId)) {
        res.status(403).send('Forbidden');
        return;
      }
      const userGoals = await prisma.goal.findMany({
        where: {
          userId: Number(session.userId)
        }
      });
      res.locals.userGoals = userGoals;
      return next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      return next(
        createErr({ method: 'getUserGoals', type: 'getting iser goals', err })
      );
    }
  },

  getAllGoals: async (req, res, next) => {
    try {
      const allGoals = await prisma.goal.findMany({
        // where: { title: true }
      });
      res.locals.allGoals = allGoals;
      return next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      return next(
        createErr({ method: 'getAllGoals', type: 'getting goal', err })
      );
    }
  },

  createGoal: async (req, res, next) => {
    try {
      // destructure whatever is necessary from req.body for new path creation.
      const { title, userId } = req.body;
      // create new path object here according to DB Schema.
      const newGoal = await prisma.goal.create({
        data: { title: title, userId: Number(userId) }
      });
      res.locals.newGoal = newGoal;
      next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      return next(
        createErr({ method: 'createGoal', type: 'creating goal', err })
      );
    }
  },

  createGoals: async (req, res, next) => {
    try {
      // destructure whatever is necessary from req.body for new path creation.
      const { title, name } = req.body;
      // create new path object here according to DB Schema.
      const newGoal = await prisma.goal.create({
        data: { title: title, userId: Number(userId) }
      });
      res.locals.newGoal = newGoal;
      next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      return next(
        createErr({ method: 'createGoal', type: 'creating goal', err })
      );
    }
  },

  updateGoal: async (req, res, next) => {
    try {
      let { id } = req.params;
      const NumberId = Number(id);
      // destructure whatever is needed from the req.body to update the path;
      const { title } = req.body;
      const updatedGoal = await prisma.goal.update({
        where: { id: NumberId },
        data: {
          title: title
        }
      });
      // update existing goal in the DB, the goal id will be passed in the request params (URL);
      res.locals.updatedGoal = updatedGoal;
      return next();
    } catch (err) {
      return next(
        createErr({ method: 'updateGoal', type: 'updating goal', err })
      );
    }
  },

  deleteGoal: async (req, res, next) => {
    try {
      let { id } = req.params;
      const NumberId = Number(id);
      const deletedGoal = await prisma.goal.delete({
        where: {
          id: NumberId
        }
      });
      res.locals.deletedGoal = deletedGoal;
      return next();
    } catch (err) {
      return next(
        createErr({ method: 'deleteGoal', type: 'deleting goal', err })
      );
    }
  }
};

module.exports = goalController;
