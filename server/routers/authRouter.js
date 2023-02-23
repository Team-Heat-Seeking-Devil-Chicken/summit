// const express = require('express');
// const authRouter = express.Router();
// const cookieParser = require('cookie-parser');
// const crypto = require('crypto');
// const authController = require('../controllers/authController');

// const sessions = new Map();

// authRouter.get('/allUsers', authController.getAllUsers, (req, res, next) => {
//   res.status(200).json(res.locals.allUsers);
// });

// authRouter.get('/login/github', authController.goToGithub);

// // async (req, res) => {
// //   res.redirect('/login');
// // }

// authRouter.get(
//   '/login',
//   authController.getGithub,
//   authController.getUser,
//   authController.createSession,
//   async (req, res) => {
//     res.redirect('/Profile');
//   }
// );

// authRouter.get('/signup', authController.createUser, async (req, res) => {
//   res.redirect('/Profile');
// });

// module.exports = authRouter;
