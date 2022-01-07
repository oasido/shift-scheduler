const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blockedDates = new Schema({
  userID: { type: String, required: true },
  dates: { type: String, required: true },
});

module.exports = mongoose.model('blockedDates', blockedDates);
