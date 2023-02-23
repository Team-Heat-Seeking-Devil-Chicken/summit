const express = require('express');
const prisma = require('../db.js');

const users = [
  'Jennifer Liu',
  'Zachary Skobkariov',
  'Keely Timms',
  'Easton Miller',
  'Lance Ziegler',
  'Jack Moorman',
  'Mason Royal',
  'Ian Davis',
  'Maui Garza',
  'Garrett Hutson',
  'Michael Angelo Garcia',
  'Emily Hoang Lin',
  'Michael Dunnmon',
  'Claire Tischuk',
  'Yusuf Bhaiyat',
  'Cindy Chau',
  'Ngoc Zwolinski',
  'Lennon Stewart',
  'Britta Ager',
  'Peter Lam',
  'Brian Lim',
  'Saad Hamdani',
  'Brian Holmes',
  'Steven Min',
  'Ben Huang',
  'Jen Lee',
  'Anthony Vega',
  'Thomas Kady',
  'Angelo Chengcuenca',
  'Victor Ye',
  'Alex Czaja',
  'Yohan Jeon',
  'Zachary Freeman'
];

// error handling
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `userController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    status: 400,
    message: {
      err: `userController.${method}: ERROR: Check server logs for details`
    }
  };
};

const userController = {
  getUsers: async (req, res, next) => {
    try {
      const users = await prisma.user.findMany({});
      res.locals.users = users;
      return next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      return next(
        createErr({ method: 'getUsers', type: 'getting users', err })
      );
    }
  },
  createUser: async (req, res, next) => {
    try {
      // destructure whatever is necessary from req.body for new user creation.
      const { name } = req.body;
      // create new user object here according to DB Schema.
      const newUser = await prisma.user.create({
        data: { name: name }
      });
      res.locals.newUser = newUser;
      next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      return next(
        createErr({ method: 'createUser', type: 'creating user', err })
      );
    }
  },
  createUsers: async (req, res, next) => {
    try {
      users.forEach(async (user) => {
        console.log(`Creating user ${user}...`);
        await prisma.user.create({
          data: {
            name: user
          }
        });
        console.log(`user ${user} created!~`);
      });
      next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      return next(
        createErr({ method: 'createUser', type: 'creating user', err })
      );
    }
  }
};

module.exports = userController;
