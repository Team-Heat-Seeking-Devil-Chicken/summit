const express = require('express');
const authRouter = express.Router();
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const authController = require('../controllers/authController');

const sessions = new Map();

authRouter.get(
  '/login',
  authController.getGithub,
  authController.getUser,
  authController.createSession,
  async (req, res) => {
    res.redirect('/userGoals');
  }
);

authRouter.get('/signup', authController.createUser, async (req, res) => {
  res.redirect('/userGoals');
});

module.exports = authRouter;
