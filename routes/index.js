const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const genPassword = require('../passport/passwordFunctions').genPassword;
const isAdmin = require('../routes/middleware/isAdmin');

// USER API

router.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    const { id, username, admin, blockedDates } = req.user;
    res.json({ id, username, admin, blockedDates, isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// REGISTER, LOGIN & LOGOUT

router.post('/register', async (req, res, next) => {
  try {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) res.json(err.msg);
      if (user) res.json('UserAlreadyExists');
      if (!user) {
        const saltHash = genPassword(req.body.password);
        const { salt, hash } = saltHash;
        const newUser = new User({
          username: req.body.username,
          hash: hash,
          salt: salt,
        });

        newUser.save().then((user) => {
          console.log(user);
          res.json('Registered');
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Logged in successfully');
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy(function (err) {
    if (!err) {
      res.status(200).clearCookie('connect.sid', { path: '/' }).json({ status: 'Success' });
    } else {
      console.error(err);
    }
  });
});

// BLOCK DATE REQUEST

router.post('/block-date', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const { date } = req.body;
      const username = req.user.username;
      const [employee] = await User.find({ username });

      if (employee.blockedDates.includes(date)) {
        return res.json({ msg: 'BlockAlreadyRequested' });
      } else {
        await User.findOneAndUpdate({ username }, { $push: { blockedDates: date } });
        return res.json({ msg: 'BlockRequestSuccess' });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    res.json('Invalid user.');
  }
});

module.exports = router;
