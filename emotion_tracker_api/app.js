const express = require('express');
const morgan = require('morgan');
const router = require('./routes/apiroutes');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'randomlygeneratedsecret55$',
    resave: false,
    saveUninitialized: false
}));
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);

module.exports = app;
