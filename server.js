const express = require('express');
const app = express();
const PORT = 4080;
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('test');
});

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));
