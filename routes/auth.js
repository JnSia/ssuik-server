const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/resister', isNotLoggedIn, async (req, res, next) => {
  const { email, password, nickname, name, birthday, phoneNumber, sex, image, job } = req.body;

  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return console.log('이미 가입한 회원입니다.')
    }

    const hash = await bcrypt.hash(password, 12);

    await User.create({
      email,
      password: hash,
      nickname,
      name,
      birthday,
      phoneNumber,
      sex,
      // image,
      job,
    });

    return 
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout((err) => {
    req.session.destroy();
    res.redirect('/');
  });
});

module.exports = router;
