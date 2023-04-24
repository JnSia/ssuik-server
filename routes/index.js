const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Advertisement, User } = require('../models');

const router = express.Router();

router.get('/', (req, res, next) => {
  const a = 'a'

  return console.log(a)
})

router.post('/', (req, res, next) => {
  console.log(req.body)
})

module.exports = router;