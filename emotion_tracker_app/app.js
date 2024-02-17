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

/*function authenticateToken(req, res, next){
// Token comes in header called 'Bearer'
const authHeader = req.headers['authorization'];

//ensure we have an authHeader and return token or undefined
const token = authHeader && authHeader.split(' ')[1];

//check for undefined
if (token == null) {
    return res.sendStatus(401); //not sent token
}

//verify is token is valid
jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
    if (err) {
        return res.sendStatus(403); //token no longer valid, no access
    }

    //at this point token is valid
    req.user = user;
    next();
})
}*/

module.exports = app;
