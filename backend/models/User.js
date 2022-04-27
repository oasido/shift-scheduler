const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  hash: String,
  salt: String,
  memberSince: String,
  status: String,
  admin: { type: Boolean, default: false },
  blockedDates: [{ date: String, comment: String, approved: Boolean, approvedBy: String }],
});

module.exports = mongoose.model('User', User);
