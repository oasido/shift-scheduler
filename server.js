const express = require('express');
const app = express();
const PORT = 4080;
require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shift-scheduler');

});

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));
