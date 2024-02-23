const jwt = require("jsonwebtoken");
/*
https://www.youtube.com/watch?v=mbsmsi7l3r4
*/

exports.checkAuth= (req, res, next) => {

// Token comes in Authorization header called 'Bearer'
const authHeader = req.headers['authorization'];

//if we have an authHeader return the token (returns undefined/null or token)
const token = authHeader && authHeader.split(' ')[1];

//check for undefined
if (token == null || !token) {
    return res.sendStatus(401); //not sent token- Unauthorised
}

//verify token is valid
jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
    if (err) {
        return res.sendStatus(403); //token no longer valid, no access- Forbidden
    }

    //at this point token is valid- set user
    req.user = user;
    next();
})
};
