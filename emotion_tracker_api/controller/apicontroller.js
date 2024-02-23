const conn = require('../database/dbconn');
const jwt = require('jsonwebtoken');
//const sql = require('./../sql/sql_statements');
const getCurrentDateTimeFormatted = require('../utils/functions/datescript');
const newSnapShotSQL = require('../utils/functions/db_operations');

// GET /users
exports.getUsers = async (req, res) => {

    const selectSQL = 'SELECT * FROM user';

    try {
        const result = await conn.query(selectSQL);
        console.log(result);
        res.json(result);

    } catch (err) {
        console.log(err);
        res.json(err);
    };
};

exports.postLogin = async (req, res) => {


    const { username, password } = req.body;
    const vals = [username, password];

    const checkuserSQL =
        `SELECT * FROM user WHERE email = ? AND password = ?`;

    try {
        const [rows] = await conn.query(checkuserSQL, vals);

        console.log("vals are " + vals);
        const numrows = rows.length;
        console.log("number of rows:" + numrows);

        if (numrows > 0) {
            const user_identifier = rows[0].user_id;

            console.log(rows);
            const userObj = { user: user_identifier };

            //token timeout after 30 mins
            const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1800000' });
            res.json({ accessToken: accessToken });
        }
    } catch (err) {
        console.log(err);
        res.json(err);
    };
};


exports.postCreateSnapshot = async (req, res) => {

    //get time in db timestamp format from js function
    const currentDate = getCurrentDateTimeFormatted();

    //extract user_id from req obj
    const user = req.user.user;

    //get the rest of snapshot values from req body
    const { snapshot_headline, snapshot_note, anger_val, contempt_val,
        disgust_val, enjoyment_val, fear_val, sadness_val, surprise_val,
        trigger_1, trigger_2, trigger_3 } = req.body;

    //store vals in right order for param. query
    const vals = [null, snapshot_headline, snapshot_note, currentDate,
        user, null, anger_val, null, contempt_val, null, disgust_val, null,
        enjoyment_val, null, fear_val, null, sadness_val, null,
        surprise_val, null, trigger_1, null, null, trigger_2, null, null, trigger_3, null];

    //get sql from js function
    const postSnapshotSQL = newSnapShotSQL();

    try {
        const [rows] = await conn.query(postSnapshotSQL, vals);

        const numrows = rows.length;
        
        if (numrows > 0) {
            console.log("post to db successful");
            res.sendStatus(200);
        }
    } catch (err) {
        res.json(err);
    };

}

/*
exports.postNewUser = async (req, res) => {

    //INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `registration_date`, `birthdate`, `security_question_one`, `security_answer_one`, `security_question_two`, `security_answer_two`, `email`, `password`) VALUES (NULL, 'Bob', 'Murray', CURRENT_TIMESTAMP, '2024-02-22', 'Favourite day', 'Friday', 'Fave colour', 'Red', 'robert@hotmail.com', 0xbf2dfbc3351e46b3ce64 )
}*/



exports.getSnapshotSummary = async (req, res) => {

    //extract user_id from req obj
    const user = req.user.user;

    const getUserSnapshotsSQL = `SELECT * FROM snapshot
    LEFT JOIN emotion_snapshot ON snapshot.snapshot_id = emotion_snapshot.snapshot_id
    LEFT JOIN emotion ON emotion_snapshot.emotion_id = emotion.emotion_id
    LEFT JOIN trigger_snapshot ON snapshot.snapshot_id = trigger_snapshot.snapshot_id
    LEFT JOIN trigger_table ON trigger_snapshot.trigger_id = trigger_table.trigger_id
    WHERE  user_id = ?;`;

    try {
        const result = await conn.query(getUserSnapshotsSQL, user);
        console.log(result);
        res.json(result);

    } catch (err) {
        console.log(err);
        res.json(err);
    };
};


/*

exports.getSnapshot

exports.getTrigger

exports.postTrigger

exports.deleteTrigger

exports.postSnapshot

exports.patchSnapshot

exports.deleteSnapshot*/