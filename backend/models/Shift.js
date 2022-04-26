const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Shift = new Schema({
  name: String,
  date: Date,
  data: Object,
  savedBy: String,
});

module.exports = mongoose.model('Shift', Shift);
