require('dotenv').config();
const express = require('express');
const indexRoute = require('./src/routes/index');
const mediaRoute = require('./src/routes/mediaRoute');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/spreadsheet', indexRoute);
app.use('/media', mediaRoute);

app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});