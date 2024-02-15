const conn = require('../database/dbconn');

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
            console.log(rows);
            const session =req.session;
            session.isloggedin = true;
            console.log(session);
            res.send(session);
        } else {
            res.redirect('/login');
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