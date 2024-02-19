const conn = require('../database/dbconn');
const jwt = require('jsonwebtoken');
const auth = require('./../utils/middleware/authentication');

// GET /users
exports.getUsers = async (req, res) => {

    const selectSQL = 'SELECT * FROM user';

    try {
        const result = await conn.query(selectSQL);
        console.log(result);
        res.json(result);

    }catch (err) {
        console.log(err);
        res.json(err);
    };
};

exports.postLogin = async (req, res) => {


    const {username, password} = req.body;
    const vals = [username, password];

    const checkuserSQL = 
    `SELECT * FROM user WHERE email = ? AND password = ?`;

    try {
        const [rows] = await conn.query(checkuserSQL, vals);

        console.log("vals are " +vals);
        const numrows = rows.length;
        console.log("number of rows:" + numrows);

        if (numrows>0){
            const user_identifier = rows[0].user_id;
            const greeting = rows[0].login_greeting;

            console.log(rows);
            const userObj = { user: user_identifier };
            const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, 
                {expiresIn: '900000'});
            /*res.json({accessToken: accessToken});
            res.cookie('token', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });*/
            //res.setHeader('x-auth-token', accessToken);
            //res.send(greeting);
            res.json("hello mucker");
        }
    }catch (err) {
        console.log(err);
        res.json(err);
    };
};



exports.getSummary

exports.getSnapshot

exports.getTrigger

exports.postTrigger

exports.deleteTrigger

exports.postSnapshot

exports.patchSnapshot

exports.deleteSnapshot