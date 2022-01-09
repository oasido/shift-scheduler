const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: { type: String },
  memberSince: { type: String },
  status: { type: String },
  admin: { type: Boolean, default: false },
  blockedDates: [{ type: String }],
});

const options = {
  errorMessages: {
    IncorrectPasswordError: `משהו כאן לא נכון...`,
  },
};

User.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', User);
