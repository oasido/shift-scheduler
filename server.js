const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const app = express();
const PORT = 4080;
require('dotenv').config();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'boterham',
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/shift-scheduler' }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

const mongoose = require('mongoose');
const User = require('./models/User');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shift-scheduler');

app.get('/', async (req, res) => {
  const user = new User({ username: 'user', blockedDates: [] });
  await user.setPassword('password');
  await user.save();
  res.send('done');
});

app.get('/api/user', async (req, res) => {
  res.send('test');
});

app.post('/login', (req, res) => {
  try {
    const username = req.user.username;
    res.send({ username });
  } catch (error) {
    res.send(error);
  }
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
