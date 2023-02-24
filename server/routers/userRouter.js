const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get('/getUsers', userController.getUsers, (req, res, next) => {
  return res.status(200).json(res.locals.users);
});

userRouter.post('/addUser', userController.createUser, (req, res, next) => {
  return res.status(200).json(res.locals.newUser);
});

userRouter.post('/addUsers', userController.createUsers, (req, res, next) => {
  return res.status(200);
});

module.exports = userRouter;
