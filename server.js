const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo');

const app = express();
const PORT = 4080;

require('dotenv').config();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const User = require('./models/User');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shift-scheduler');

/**
 * PASSPORT SET UP
 **/

passport.use(
  new LocalStrategy((username, password, cb) => {
    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          return cb(null, false);
        }

        const isValid = validPassword(password, user.hash, user.salt);

        if (isValid) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      })
      .catch((err) => {
        cb(err);
      });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

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

// PASSPORT AUTHENTICATION BEFORE ROUTES
app.use(passport.initialize());
app.use(passport.session());

/**
 * ROUTES
 **/

app.get('/', async (req, res) => {
  const user = new User({ username: 'user', blockedDates: [] });
  await user.setPassword('password');
  await user.save();
  res.send('done');
});

app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    const { id, username, admin, blockedDates } = req.user;
    res.json({ id, username, admin, blockedDates, isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
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
