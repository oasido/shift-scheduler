const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('./../models/User');
const Shift = require('./../models/Shift');
const genPassword = require('./../passport/passwordFunctions').genPassword;
const isAdmin = require('./middleware/isAdmin');
const _ = require('lodash');
const { nextSunday, getISOWeek, format } = require('date-fns');

// USER API
router.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    const { id, username, admin, blockedDates } = req.user;
    res.json({ id, username, admin, blockedDates, isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// ADMIN GET ALL USERS API
router.get('/api/users', isAdmin, async (req, res) => {
  if (req.isAuthenticated()) {
    const users = await User.find({});
    res.json(users);
  } else {
    res.json({ isAuthenticated: false });
  }
});

// REGISTER (admin only), LOGIN & LOGOUT
router.post('/register', isAdmin, async (req, res, next) => {
  try {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) res.json(err.msg);
      if (user) res.json('UserAlreadyExists');
      if (!user && req.body.username !== '') {
        const saltHash = genPassword(req.body.password);
        const { salt, hash } = saltHash;
        const newUser = new User({
          username: req.body.username,
          hash: hash,
          salt: salt,
        });

        newUser.save().then((user) => {
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

// USER REMOVE REQUESTS
router.post('/delete-request', async (req, res) => {
  try {
    const { employeeID, dateID } = req.body;

    await User.findOneAndUpdate(
      { _id: employeeID },
      {
        $pull: { blockedDates: { _id: dateID } },
      }
    );
    res.send({ msg: 'RequestDeletionSuccess' });
  } catch (error) {
    console.error(error);
    res.send('Error');
  }
});

// USER GET SCHEDULE
router.get('/getSchedule', async (req, res) => {
  try {
    const shift = await Shift.find().sort({ _id: -1 }).limit(1);
    res.send(shift);
  } catch (error) {
    console.error(error);
    res.send('Error');
  }
});

// ADMIN SAVE SCHEDULE
router.post('/postSchedule', isAdmin, async (req, res) => {
  try {
    // save schedule to database
    const { savedSchedule, savedBy } = req.body;
    const currentDate = new Date();
    const upcomingSunday = nextSunday(currentDate);
    const name = `(WN ${getISOWeek(upcomingSunday)}) ${format(upcomingSunday, `dd-MM-yyyy`)}`;
    const newShift = await new Shift({
      name,
      data: savedSchedule,
      savedBy,
      date: currentDate,
    });
    newShift.save();

    res.send('Success');
  } catch (error) {
    console.error(error);
    res.send(error.msg);
  }
});

// ADMIN REMOVE SCHEDULE
router.post('/removeSchedule', isAdmin, async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    await Shift.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    res.send('Error');
  }
});

// ADMIN GET ALL SCHEDULE HISTORY
router.get('/getScheduleHistory', isAdmin, async (req, res) => {
  try {
    const shifts = await Shift.find({});
    res.send(shifts);
  } catch (error) {
    console.log(error);
    res.send('Error');
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

// ADMIN MANAGE USERS
router.post('/update-user', isAdmin, async (req, res) => {
  try {
    const { _id: id, username, password } = req.body.modalData;

    // console.log(req.body.modalData);

    if (!username) {
      res.send('UsernameIsEmpty');
      return;
    }

    const foundUser = await User.findOne({ username });

    switch (true) {
      case foundUser === null:
        console.log('User not found, nothing to update');
        await User.findOneAndUpdate({ _id: id }, { username });
        res.send('Success');
        break;
      case foundUser.username === username && foundUser.id !== id:
        console.log('username taken');
        res.send('UsernameTaken');
        break;
      case foundUser.username === username:
        console.log('nothing happened, same user');
        res.send('NoChangesMade');
        break;
      default:
        // what does default mean?
        console.log('hit default');
        break;
    }

    if (password) {
      const saltHash = genPassword(password);
      const { salt, hash } = saltHash;
      await User.findOneAndUpdate({ _id: id }, { $set: { salt, hash } });
    }
  } catch (error) {
    console.error(error);
    res.send(error.msg);
  }
});

// ADMIN DELETE USER
router.post('/delete-user', isAdmin, async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);
    await User.findByIdAndDelete(_id);
    res.send('RequestDeletionSuccess');
  } catch (error) {
    console.log(error);
    res.send(error.msg);
  }
});

// CATCH ALL ROUTE
router.get('*', (req, res) => {
  try {
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
