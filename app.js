require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(x => console.log(`Connected to Mongo! Databa  se name: ${x.connections[0].name}`))
.catch(err => console.log("Error connecting to Mongo: ", err));

const app = express();

app.use(cors({
    origin: ["http://localhost:3001"],
    credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const formatsRouter = require('./routes/formats');
const recordsRouter = require('./routes/records');

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/formats', formatsRouter);
app.use('/api/records', recordsRouter);

module.exports = app;
