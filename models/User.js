const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: { type: String, required: true },
  memberSince: { type: String, required: true },
  status: { type: String, required: false },
  admin: { type: Boolean, required: true, default: false },
  blockedDates: [{ type: Schema.Types.ObjectId, ref: 'blockedDates' }],
});

const options = {
  errorMessages: {
    IncorrectPasswordError: `משהו כאן לא נכון...`,
  },
};

User.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', User);
