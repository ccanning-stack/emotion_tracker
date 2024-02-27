const conn = require('../database/dbconn');
const jwt = require('jsonwebtoken');
//const sql = require('./../sql/sql_statements');
const getCurrentDateTimeFormatted = require('../utils/functions/datescript');
const {
    newSnapShotFunc,
    getSnapshotDetailFunc,
    getAngerIntensityFunc,
    getContemptIntensityFunc,
    getDisgustIntensityFunc,
    getEnjoymentIntensityFunc,
    getFearIntensityFunc,
    getSadnessIntensityFunc,
    getSurpriseIntensityFunc,
    getTriggerDetailFunc,
    updateTriggersFunc,
    deleteSnapshotFunc
} = require('../utils/functions/db_operations');

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

        const numrows = rows.length;

        if (numrows > 0) {
            const user_identifier = rows[0].user_id;

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
    const postSnapshotSQL = newSnapShotFunc();

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

};

/*
exports.postNewUser = async (req, res) => {

    //INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `registration_date`, `birthdate`, `security_question_one`, `security_answer_one`, `security_question_two`, `security_answer_two`, `email`, `password`) VALUES (NULL, 'Bob', 'Murray', CURRENT_TIMESTAMP, '2024-02-22', 'Favourite day', 'Friday', 'Fave colour', 'Red', 'robert@hotmail.com', 0xbf2dfbc3351e46b3ce64 )
}*/



exports.getSnapshotSummary = async (req, res) => {

    //extract user_id from req obj
    const user = req.user.user;

    const getUserSnapshotsSQL = `SELECT snapshot_id, title, datetime_created
     FROM snapshot WHERE  user_id = ?;`;

    try {
        const result = await conn.query(getUserSnapshotsSQL, user);

        const dataObjects = [result][0][0];

        res.json(dataObjects);

    } catch (err) {
        console.log(err);
        res.json(err);
    };
};


exports.getSnapshotDetails = async (req, res) => {

    const { id } = req.params;

    console.log(id);

    //prepare vals for param. queries
    const angerVals = [id, 1];
    const contemptVals = [id, 2];
    const disgustVals = [id, 3];
    const enjoymentVals = [id, 4];
    const fearVals = [id, 5];
    const sadnessVals = [id, 6];
    const surpriseVals = [id, 7];

    //obtain sql from functions
    const getSnapshotDetailSQL = getSnapshotDetailFunc();
    const getAngerIntensitySQL = getAngerIntensityFunc();
    const getContemptIntensitySQL = getContemptIntensityFunc();
    const getDisgustIntensitySQL = getDisgustIntensityFunc();
    const getEnjoymentIntensitySQL = getEnjoymentIntensityFunc();
    const getFearIntensitySQL = getFearIntensityFunc();
    const getSadnessIntensitySQL = getSadnessIntensityFunc();
    const getSurpriseIntensitySQL = getSurpriseIntensityFunc();
    const getTriggerDetailSQL = getTriggerDetailFunc();

    try {

        const [snap] = await conn.query(getSnapshotDetailSQL, id);
        const [ang] = await conn.query(getAngerIntensitySQL, angerVals);
        const [cont] = await conn.query(getContemptIntensitySQL, contemptVals);
        const [disg] = await conn.query(getDisgustIntensitySQL, disgustVals);
        const [enj] = await conn.query(getEnjoymentIntensitySQL, enjoymentVals);
        const [fear] = await conn.query(getFearIntensitySQL, fearVals);
        const [sad] = await conn.query(getSadnessIntensitySQL, sadnessVals);
        const [surp] = await conn.query(getSurpriseIntensitySQL, surpriseVals);
        const [trig] = await conn.query(getTriggerDetailSQL, id);

        const dataObjects = { snap, ang, cont, disg, enj, fear, sad, surp, trig };

        console.log(dataObjects);
        res.json(dataObjects);

    } catch (err) {
        console.log(err);
        res.json(err);
    };
};


exports.patchUpdateSnapshot = async (req, res) => {


    //PATCH section
    //Get updated trigger values & original trigger_ids from req body
    const { trig1_id, trig2_id, trig3_id, updated_trigger_1,  
        updated_trigger_2, updated_trigger_3} = req.body;

    const vals = [updated_trigger_1, trig1_id, updated_trigger_2, trig2_id,
        updated_trigger_3, trig3_id];

    const updateTriggersSQL = updateTriggersFunc();

    //SUMMARY section for redirecting back to summary page after saving edits
    //extract user_id from req obj
    const user = req.user.user;
    const getUserSnapshotsSQL = `SELECT snapshot_id, title, datetime_created
     FROM snapshot WHERE  user_id = ?;`;
    

    try {

        //update triggers
        const [rows] = await conn.query(updateTriggersSQL, vals);

        //retrieve snapshot objects for current user
        const result = await conn.query(getUserSnapshotsSQL, user);
        const dataObjects = [result][0][0];

        console.log(rows);

        //assisted by chatGPT - iterates over ResultSetHeader objects array
        //checks the changedRows property and returns true as soon as it finds one instance
        const resultSet = rows;
        const hasChangedRows = resultSet.some(header => header.changedRows > 0);

        if (hasChangedRows) {
           console.log("db trigger update successful");
           
           //pass back updated snapshot summary for user
           res.json(dataObjects);
        }
    } catch (err) {
        console.log(err);
        res.json(err);
    };
};


exports.deleteSnapshot = async (req, res) => {


    //DELETE section
    //Get snapshot_id submitted for deletion from req body
    const { snap_id_del } = req.body;
    const deleteSnapshotSQL = deleteSnapshotFunc();  
    const vals = [snap_id_del, snap_id_del, snap_id_del, snap_id_del];

    //SUMMARY section for redirecting back to summary page after saving deletion
    //extract user_id from req obj
    const user = req.user.user;
    const getUserSnapshotsSQL = `SELECT snapshot_id, title, datetime_created
     FROM snapshot WHERE  user_id = ?;`;
    

    try {

        //delete snapshot
        const [rows] = await conn.query(deleteSnapshotSQL, vals);

        //retrieve remaining snapshots for current user
        const result = await conn.query(getUserSnapshotsSQL, user);
        const dataObjects = [result][0][0];

        console.log(rows);

        //assisted by chatGPT - iterates over ResultSetHeader objects array
        //checks the changedRows property and returns true as soon as it finds one instance
        /*const resultSet = rows;
        const hasChangedRows = resultSet.some(header => header.changedRows > 0);*/
        
        const numrows = rows.length;

        if (numrows > 0){
           console.log("db snapshot deletion successful");
           
           //pass back updated snapshot summary for user
           res.json(dataObjects);
        }
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