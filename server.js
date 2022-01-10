const express = require('express');
const passport = require('passport');
const app = express();
const PORT = 4080;
require('dotenv').config();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const mongoose = require('mongoose');
const User = require('./models/User');
const blockedDates = require('./models/blockedDates');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shift-scheduler');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', async (req, res) => {
  const user = new User({ username: 'user' });
  await user.setPassword('password');
  await user.save();
  res.send('done');
});

app.post('/block-date', async (req, res) => {
  try {
    const { date } = req.body;
    const [employee] = await User.find({ username: 'user' });

    if (employee.blockedDates.includes(date)) {
      return res.send({ msg: 'date already blocked' });
    } else {
      await User.findOneAndUpdate({ username: 'user' }, { $push: { blockedDates: date } });
      return res.send({ msg: 'request sent' });
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));
