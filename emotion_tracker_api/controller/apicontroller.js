const conn = require('../database/dbconn');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
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
    deleteSnapshotFunc,
    insertUserFunc,
    checkEmailFunc,
    checkUserFunc,
    getUserSnapshotsFunc,
    validateUsernameFunc,
    verifySecurityFunc,
    changePasswordFunc,
    getSnapshotsFunc
} = require('../utils/functions/db_operations');


exports.postNewUser = async (req, res) => {

    const validatorErrors = validationResult(req);

    if (!validatorErrors.isEmpty()) {
        const responseData = {
            errors: validatorErrors.array(),
        };
        return res.status(422).json(responseData);
    }

    //extract register values from req body & immediately hash password
    const { first_name, surname, email_add, birthdate, security_qtn_1,
        security_ans_1, security_qtn_2, security_ans_2, initial_password } = req.body;
    const hash = await bcrypt.hash(initial_password, 13);


    //first: check if email is already in db
    try {
        const checkEmailSQL = checkEmailFunc();
        const [rows] = await conn.query(checkEmailSQL, email_add);

        if (!rows.length == 0) {
            //https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
            return res.sendStatus(409);
        }
    } catch (err) {
        res.json(err);
    }

    //get time in db timestamp format from js function
    const currentDate = getCurrentDateTimeFormatted();

    const vals = [null, first_name, surname, currentDate, birthdate, security_qtn_1,
        security_ans_1, security_qtn_2, security_ans_2, email_add, hash];

    const insertUserSQL = insertUserFunc();

    try {
        const [rows] = await conn.query(insertUserSQL, vals);
        const { affectedRows } = rows;

        if (affectedRows > 0) {
            res.sendStatus(200);
        }
    } catch (err) {
        res.json(err);
    };
};



exports.postLogin = async (req, res) => {
    //https://www.npmjs.com/package/bcrypt
    //https://www.youtube.com/watch?v=AzA_LTDoFqY
    //https://www.npmjs.com/package/jsonwebtoken

    const { username, password } = req.body;

    const checkuserSQL = checkUserFunc();

    try {
        const [rows] = await conn.query(checkuserSQL, username);

        //user not found in db
        if (rows.length < 1) {
            return res.sendStatus(401);
        }

        const isMatch = await bcrypt.compare(password, rows[0].password);

        if (!isMatch) {
            return res.sendStatus(401);
        }

        if (isMatch) {
            const user_identifier = rows[0].user_id;

            const userObj = { user: user_identifier };

            //token timeout after 20 mins
            const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '20m' });
            res.json({ accessToken: accessToken });
        }
    } catch (err) {
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

    //SUMMARY section for redirecting back to summary page after saving deletion
    //extract user_id from req obj
    const getUserSnapshotsSQL = getUserSnapshotsFunc();

    try {
        const [rows] = await conn.query(postSnapshotSQL, vals);
        const numrows = rows.length;

        //retrieve remaining snapshots for current user
        const result = await conn.query(getUserSnapshotsSQL, user);
        const dataObjects = [result][0][0];

        if (numrows > 0) {
            res.status(200).json(dataObjects);
        }
    } catch (err) {
        res.json(err);
    };

};




exports.getSnapshotSummary = async (req, res) => {

    //extract user_id from req obj
    const user = req.user.user;


    const getUserSnapshotsSQL = getUserSnapshotsFunc();

    try {
        const result = await conn.query(getUserSnapshotsSQL, user);

        const dataObjects = [result][0][0];

        res.json(dataObjects);

    } catch (err) {
        res.json(err);
    };
};


exports.getSnapshotDetails = async (req, res) => {

    const { id } = req.params;

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

        res.json(dataObjects);

    } catch (err) {
        res.json(err);
    };
};


exports.patchUpdateSnapshot = async (req, res) => {

    //PATCH section
    //Get updated trigger values & original trigger_ids from req body
    const { trig1_id, trig2_id, trig3_id, updated_trigger_1,
        updated_trigger_2, updated_trigger_3 } = req.body;

    const vals = [updated_trigger_1, trig1_id, updated_trigger_2, trig2_id,
        updated_trigger_3, trig3_id];

    const updateTriggersSQL = updateTriggersFunc();

    //SUMMARY section for redirecting back to summary page after saving edits
    //extract user_id from req obj
    const user = req.user.user;
    const getUserSnapshotsSQL = getUserSnapshotsFunc();


    try {

        //update triggers
        const [rows] = await conn.query(updateTriggersSQL, vals);

        //retrieve snapshot objects for current user
        const result = await conn.query(getUserSnapshotsSQL, user);
        const dataObjects = [result][0][0];

        //assisted by chatGPT - iterates over ResultSetHeader objects array
        //checks the changedRows property and returns true as soon as it finds one instance
        const resultSet = rows;
        const hasChangedRows = resultSet.some(header => header.changedRows > 0);

        if (hasChangedRows) {
            //pass back updated snapshot summary for user
            res.json(dataObjects);
        }
    } catch (err) {
        res.json(err);
    };
};


exports.deleteSnapshot = async (req, res) => {

    //DELETE section
    //Get snapshot_id & trigger_ids submitted for deletion from req body
    const { snap_id_del, trig1_id, trig2_id, trig3_id } = req.body;
    const deleteSnapshotSQL = deleteSnapshotFunc();
    const vals = [snap_id_del, snap_id_del, trig1_id, trig2_id, trig3_id, snap_id_del];

    //SUMMARY section for redirecting back to summary page after saving deletion
    //extract user_id from req obj
    const user = req.user.user;
    const getUserSnapshotsSQL = getUserSnapshotsFunc();


    try {

        //delete snapshot
        const [rows] = await conn.query(deleteSnapshotSQL, vals);

        //retrieve remaining snapshots for current user
        const result = await conn.query(getUserSnapshotsSQL, user);
        const dataObjects = [result][0][0];

        //assisted by chatGPT - iterates over ResultSetHeader objects array
        //checks the affectedRows property and returns true as soon as it finds one instance
        const resultSet = rows;
        const hasAffectedRows = resultSet.some(header => header.affectedRows > 0);

        if (hasAffectedRows) {
            //pass back updated snapshot summary for user
            res.json(dataObjects);
        }
    } catch (err) {

        res.json(err);
    };
};

exports.postConfirmUsername = async (req, res) => {

    const { user_confirm } = req.body;

    const validateUsernameSQL = validateUsernameFunc();

    try {
        const [rows] = await conn.query(validateUsernameSQL, user_confirm);

        //user not found in db
        if (rows.length < 1) {
            return res.sendStatus(404);
        }

        const responseData = {
            user_id: rows[0].user_id,
            security_question_one: rows[0].security_question_one,
            security_question_two: rows[0].security_question_two
        };
        return res.status(200).json(responseData);

    } catch (err) {
        res.json(err);
    };
};


exports.postConfirmSecurity = async (req, res) => {

    const { user_changing_pwd, reset_answer_1, reset_answer_2, user_sec_1, user_sec_2 } = req.body;

    const verifySecuritySQL =verifySecurityFunc();

    const vals = [user_changing_pwd, reset_answer_1, reset_answer_2];

    const securityData = {
        user_id: user_changing_pwd,
        security_question_one: user_sec_1,
        security_question_two: user_sec_2
    };

    try {
        const [rows] = await conn.query(verifySecuritySQL, vals);

        //details not correct
        if (rows.length < 1) {
            return res.status(403).json(securityData);
        };

        const responseData = {
            user_id: rows[0].user_id
        };

        return res.status(200).json(responseData);

    } catch (err) {
        res.json(err);
    };
};

exports.patchChangePassword = async (req, res) => {

    const validatorErrors = validationResult(req);

    if (!validatorErrors.isEmpty()) {
        const responseData = {
            errors: validatorErrors.array(),
        };
        return res.status(422).json(responseData);
    }

    const { user_changing_pwd, pwd_change_1, pwd_change_2 } = req.body;
    const hash = await bcrypt.hash(pwd_change_1, 13);

    const changePasswordSQL = changePasswordFunc();

    const vals = [hash, user_changing_pwd];

    try {
        const [rows] = await conn.query(changePasswordSQL, vals);

        const changedRows = rows.changedRows;

        //password not changed
        if (changedRows === 0 || !changedRows) {
            return res.sendStatus(400);
        }

        return res.sendStatus(200);

    } catch (err) {
        res.json(err);
    };
};

exports.getInsights = async (req, res) => {

    //extract user_id from req obj
    const user_id = req.user.user;

    //Get all snapshot_ids for this user

    const getSnapshotsSQL = getSnapshotsFunc();


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

    const dataObjects = [];

    try {

        const [rows] = await conn.query(getSnapshotsSQL, user_id);

        for (const {snapshot_id} of rows) {

            //prepare vals for param. queries
            const angerVals = [snapshot_id, 1];
            const contemptVals = [snapshot_id, 2];
            const disgustVals = [snapshot_id, 3];
            const enjoymentVals = [snapshot_id, 4];
            const fearVals = [snapshot_id, 5];
            const sadnessVals = [snapshot_id, 6];
            const surpriseVals = [snapshot_id, 7];

            const [snap] = await conn.query(getSnapshotDetailSQL, snapshot_id);
            const [ang] = await conn.query(getAngerIntensitySQL, angerVals);
            const [cont] = await conn.query(getContemptIntensitySQL, contemptVals);
            const [disg] = await conn.query(getDisgustIntensitySQL, disgustVals);
            const [enj] = await conn.query(getEnjoymentIntensitySQL, enjoymentVals);
            const [fear] = await conn.query(getFearIntensitySQL, fearVals);
            const [sad] = await conn.query(getSadnessIntensitySQL, sadnessVals);
            const [surp] = await conn.query(getSurpriseIntensitySQL, surpriseVals);
            const [trig] = await conn.query(getTriggerDetailSQL, snapshot_id);

            const snapshotDetail = { snapshot_id, snap, ang, cont, disg, enj, fear, sad, surp, trig };

            dataObjects.push(snapshotDetail);
        }

        res.json(dataObjects);

    } catch (err) {
        res.json(err);
    };
};