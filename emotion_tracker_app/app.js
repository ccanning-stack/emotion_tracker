//sets up server, middleware, and routes

const express = require('express');
const morgan = require('morgan');
const router = require('./routes/routes');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

module.exports = app;
