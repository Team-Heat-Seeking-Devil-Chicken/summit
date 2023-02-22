const express = require('express');
const prisma = require('/Users/thuyhoang/repos/Codesmith/projects/summit/server/server.js');
// error handling
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `taskController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    status: 400,
    message: {
      err: `taskController.${method}: ERROR: Check server logs for details`
    }
  };
};

const taskController = {
  getUserTasks: async (req, res, next) => {
    try {
      const userTasks = await prisma.post.findMany({
        where: { title: true }
      });
      res.locals.userTasks = userTasks;
      return next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      return next(
        createErr({ method: 'getUserGoals', type: 'getting user tasks', err })
      );
    }
  },
  createTask: async (req, res, next) => {
    try {
      // destructure whatever is necessary from req.body for new path creation.
      const { title } = req.body;
      // create new path object here according to DB Schema.
      const newTask = await prisma.goal.create({
        data: { title: title }
      });
      res.locals.newTask = newTask;
      next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      return next(
        createErr({ method: 'createTask', type: 'creating task', err })
      );
    }
  },
  updateTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      // destructure whatever is needed from the req.body to update the path;
      const { tasks } = req.body;
      const updatedTask = await prisma.goal.update({
        where: { id },
        data: {
          updatedAt: now(),
          title: title
        }
      });
      // update existing goal in the DB, the goal id will be passed in the request params (URL);
      res.locals.updatedTask = updatedTask;
      return next();
    } catch (err) {
      return next(
        createErr({ method: 'updateGoal', type: 'updating goal', err })
      );
    }
  },
  deleteTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedTask = await prisma.goal.delete({
        where: {
          id
        }
      });
      res.locals.deletedTask = deletedTask;
      return next();
    } catch (err) {
      return next(
        createErr({ method: 'deleteTask', type: 'deleting task', err })
      );
    }
  }
};

module.exports = taskController;
