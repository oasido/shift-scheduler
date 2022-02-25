const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const genPassword = require('../passport/passwordFunctions').genPassword;
const isAdmin = require('../routes/middleware/isAdmin');
const _ = require('lodash');

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
  res.send('loginSuccessful');
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
      const { date, comment } = req.body;
      const username = req.user.username;
      const [employee] = await User.find({ username });

      if (employee.blockedDates.find((element) => element.date === date)) {
        return res.json({ msg: 'BlockAlreadyRequested' });
      } else {
        await User.findOneAndUpdate(
          { username },
          { $push: { blockedDates: { date, comment, approved: false, approvedBy: '' } } }
        );
        return res.json({ msg: 'BlockRequestSuccess' });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    res.json('Invalid user.');
  }
});

// GET BLOCK REQUEST INFO
router.get('/api/request-info', async (req, res) => {
  try {
    const { employeeID, dateID } = req.query;

    const foundUser = await User.findById(employeeID);

    const filteredDate = _.filter(foundUser.blockedDates, { id: dateID });
    res.send(filteredDate);
  } catch (error) {
    console.error(error);
  }
});

// ADMIN GET USERS
router.get('/getUsers', isAdmin, async (req, res) => {
  try {
    const employees = await User.find({});
    res.json(employees);
  } catch (error) {
    console.error(error);
  }
});

// ADMIN MANAGE USERS REQUESTS
router.post('/toggle-request-status', isAdmin, async (req, res) => {
  try {
    const { dateID, employeeID, approverUsername } = req.body;
    const foundUser = await User.findById(employeeID);
    // console.log(foundUser.blockedDates);

    const filteredDate = _.filter(foundUser.blockedDates, { id: dateID });

    const [{ approved: isCurrentlyApproved }] = filteredDate;

    await User.findOneAndUpdate(
      { blockedDates: { $elemMatch: { _id: dateID } } },
      {
        $set: {
          'blockedDates.$.approved': !isCurrentlyApproved,
          'blockedDates.$.approvedBy': !isCurrentlyApproved ? approverUsername : '',
        },
      }
    );

    res.send({ msg: 'Success', operatedUser: foundUser.username, operation: !isCurrentlyApproved });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
