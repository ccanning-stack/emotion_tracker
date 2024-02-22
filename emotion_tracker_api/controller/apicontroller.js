const conn = require('../database/dbconn');
const jwt = require('jsonwebtoken');
const sql = require('./../sql/sql_statements');

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

            console.log(rows);
            const userObj = { user: user_identifier };
            const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, 
                {expiresIn: '900000'});
            res.json({accessToken: accessToken});
        }
    }catch (err) {
        console.log(err);
        res.json(err);
    };
};


exports.postCreateSnapshot = async (req, res) => {

    //extract user_id from req obj
    const user = req.user.user;
    const {username, password} = req.body;

    const vals = [NULL, snapshot-headline, snapshot-note, CURRENT_TIMESTAMP,
        user, anger-val, contempt-val, disgust-val, enjoyment-val, sadness-val,
    surprise-val, NULL, trigger_1, trigger_2, trigger_3];

    const postSnapshotSQL = 
    
    `START TRANSACTION;

    INSERT INTO snapshot (snapshot_id, title, notes, datetime_created, user_id)
    VALUES (NULL, 'Snapshot Title', 'Snapshot Notes', CURRENT_TIMESTAMP, @userID);

    SET @last_snapshot_id = LAST_INSERT_ID();
    
    INSERT INTO emotion_snapshot (emotion_snapshot_id, intensity, emotion_id, snapshot_id) VALUES
    (@angerVal, 1, @last_snapshot_id),
    (@contemptVal, 2, @last_snapshot_id),
    (@disgustVal, 3, @last_snapshot_id),
    (@enjoymentVal, 4, @last_snapshot_id),
    (@fearVal, 5, @last_snapshot_id),
    (@sadnessVal, 6, @last_snapshot_id),
    (@surpriseVal, 7, @last_snapshot_id);
    
    INSERT INTO trigger_table (trigger_id, name)
    VALUES (NULL, 'Trigger Name');
    
    SET @last_trigger_id = LAST_INSERT_ID();
    
    INSERT INTO trigger_snapshot (trigger_snapshot_id, trigger_id, snapshot_id)
    VALUES (NULL, @last_trigger_id, @last_snapshot_id);

    INSERT INTO trigger_table (trigger_id, name)
    VALUES (NULL, 'Trigger Name');
    
    SET @last_trigger_id = LAST_INSERT_ID();
    
    INSERT INTO trigger_snapshot (trigger_snapshot_id, trigger_id, snapshot_id)
    VALUES (NULL, @last_trigger_id, @last_snapshot_id);

    INSERT INTO trigger_table (trigger_id, name)
    VALUES (NULL, 'Trigger Name');
    
    SET @last_trigger_id = LAST_INSERT_ID();
    
    INSERT INTO trigger_snapshot (trigger_snapshot_id, trigger_id, snapshot_id)
    VALUES (NULL, @last_trigger_id, @last_snapshot_id);
    
    COMMIT;`;

    try {
        const [rows] = await conn.query(postSnapshotSQL, vals);

        //console.log("vals are "+vals);
        const numrows = rows.length;
        console.log("number of rows:" + numrows);

        if (numrows>0){
            console.log(rows);
            console.log("user is"+user);
            res.json("API response here");
        }
    } catch (err) {
        console.log(err);
        res.json(err);
    };
};

/*
exports.postNewUser = async (req, res) => {

    //INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `registration_date`, `birthdate`, `security_question_one`, `security_answer_one`, `security_question_two`, `security_answer_two`, `email`, `password`) VALUES (NULL, 'Bob', 'Murray', CURRENT_TIMESTAMP, '2024-02-22', 'Favourite day', 'Friday', 'Fave colour', 'Red', 'robert@hotmail.com', 0xbf2dfbc3351e46b3ce64 )
}

exports.getSummary

exports.getSnapshot

exports.getTrigger

exports.postTrigger

exports.deleteTrigger

exports.postSnapshot

exports.patchSnapshot

exports.deleteSnapshot*/