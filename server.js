const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

const userRouter = require('./controllers/user.js');
const playlistRouter = require('./controllers/playlists.js');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/users', userRouter);
app.use('/playlists', playlistRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
