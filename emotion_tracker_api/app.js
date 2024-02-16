const express = require('express');
const morgan = require('morgan');
const router = require('./routes/apiroutes');
//const cookieParser = require('cookie-parser');

const app = express();

/*
https://expressjs.com/en/resources/middleware/session.html
https://blogs.halodoc.io/user-authentication-jwt-vs-session/#:~:text=JWTs%20are%20ideal%20for%20stateless,management%2C%20and%20sensitive%20data%20protection.
*/

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);

module.exports = app;
