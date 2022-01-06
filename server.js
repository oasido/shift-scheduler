const express = require('express');
const passport = require('passport');
const app = express();
const PORT = 4080;
require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/user');
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

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));
