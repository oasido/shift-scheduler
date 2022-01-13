const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String },
  memberSince: { type: String },
  status: { type: String },
  admin: { type: Boolean, default: false },
  blockedDates: [{ type: String }],
});

module.exports = mongoose.model('User', User);
