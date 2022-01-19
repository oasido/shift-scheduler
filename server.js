const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo');
const routes = require('./routes/index');
const validPassword = require('./passport/passwordFunctions').validPassword;

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

// REGISTER, LOGIN & LOGOUT

app.post('/register', async (req, res, next) => {
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

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Logged in successfully');
});

app.post('/block-date', async (req, res) => {
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

app.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy(function (err) {
    if (!err) {
      res.status(200).clearCookie('connect.sid', { path: '/' }).json({ status: 'Success' });
    } else {
      console.error(err);
    }
  });
});

/**
 * PASSWORD FUNCTIONS
 **/

const validPassword = (password, hash, salt) => {
  var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
};

const genPassword = (password) => {
  var salt = crypto.randomBytes(32).toString('hex');
  var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt: salt,
    hash: genHash,
  };
};

// IS ADMIN MIDDLEWARE

const isAdmin = (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    res.json(error.msg);
  }
};

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));
