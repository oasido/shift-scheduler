const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  hash: String,
  salt: String,
  memberSince: String,
  status: String,
  admin: { type: Boolean, default: false },
  blockedDates: [{ type: String }],
});

module.exports = mongoose.model('User', User);
