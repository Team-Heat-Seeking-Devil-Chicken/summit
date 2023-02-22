const express = require('express');
const prisma = require('/Users/thuyhoang/repos/Codesmith/projects/summit/server/server.js');

const CLIENT_ID = 'ca1bf5075d1ff773466b';
const CLIENT_SECRET = '5a25384f8e973c828f8ec25c3d9190c9e660d55e';
const GITHUB_URL = 'https://github.com/login/oauth/access_token';

const sessions = new Map();

// error handling
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `authController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    status: 400,
    message: {
      err: `authController.${method}: ERROR: Check server logs for details`
    }
  };
};

const authController = {
  getGithub: async (req, res, next) => {
    const authlink = `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;
    // fetching to the Github auth link for the user data.
    const response = await fetch(authlink, {
      method: 'POST',
      headers: {
        accept: 'application/JSON'
      }
    });
    // parsing Github account data
    const json = await response.json();
    if (json.error) res.redirect('/?error=' + json.error);
    // fetch the Github access token.
    res.locals.token = json.access_token;
    const gitResponse = await fetch(`https://api.github.com/user`, {
      headers: {
        Authorization: `token ${json.access_token}`
      }
    });
    // parse the GitHub retrieved data.
    const user = await gitResponse.json();
    res.locals.user = user;
    console.log('DATA', user);
  },
  getUser: async (req, res, next) => {
    const token = res.locals.token;
    // search for the account by each account's Github access token.
    const search = await prisma.account.findUnique({
      where: {
        access_token: token
      }
    });

    // if the search for the user is NOT null, set the found userId equal to the current user id.
    if (search !== null) {
      res.locals.currentUser = search.userId;
    } else {
      // if the search for the user is null, create a new user via their Github data.
      return res.redirect('/signup');
    }
  },
  createUser: async (req, res, next) => {
    const user = res.locals.user;
    if (search === null) {
      // create a new user based on the Prisma schema.
      const newUser = await prisma.account.create({
        data: {
          provider: 'Github',
          providerAccountId: user.id,
          userId: {
            create: {
              name: user.login,
              image: user.avatar_url
            }
          },
          access_token: user.access_token
        }
      });
      // set current userId equal to the newly created user's userId.
      res.locals.currentUser = newUser.userId;
    }
    return res.redirect('/');
  },
  createSession: async (req, res, next) => {
    const currentUserId = res.locals.currentUser;
    const access_token = res.locals.token;
    // create new session:
    const session = {
      sessionId: crypto.randomBytes(18).toString('base64'),
      accessToken: access_token,
      userId: currentUserId
    };
    sessions.set(session.sessionId, session);
    console.log(sessions);
    res.cookie('session', session.sessionId);
    res.redirect('/profile');
  }
};

module.exports = authController;
