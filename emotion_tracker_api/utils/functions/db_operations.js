function newSnapShotFunc() {

    return `START TRANSACTION;

    INSERT INTO snapshot (snapshot_id, title, notes, datetime_created, user_id)
    VALUES (?, ?, ?, ?, ?);

    SET @last_snapshot_id = LAST_INSERT_ID();
    
    INSERT INTO emotion_snapshot (emotion_snapshot_id, intensity, emotion_id, snapshot_id) VALUES
    (?, ?, 1, @last_snapshot_id),
    (?, ?, 2, @last_snapshot_id),
    (?, ?, 3, @last_snapshot_id),
    (?, ?, 4, @last_snapshot_id),
    (?, ?, 5, @last_snapshot_id),
    (?, ?, 6, @last_snapshot_id),
    (?, ?, 7, @last_snapshot_id);
    
    INSERT INTO trigger_table (trigger_id, name)
    VALUES (?, ?);
    
    SET @last_trigger_id = LAST_INSERT_ID();
    
    INSERT INTO trigger_snapshot (trigger_snapshot_id, trigger_id, snapshot_id)
    VALUES (?, @last_trigger_id, @last_snapshot_id);

    INSERT INTO trigger_table (trigger_id, name)
    VALUES (?, ?);
    
    SET @last_trigger_id = LAST_INSERT_ID();
    
    INSERT INTO trigger_snapshot (trigger_snapshot_id, trigger_id, snapshot_id)
    VALUES (?, @last_trigger_id, @last_snapshot_id);

    INSERT INTO trigger_table (trigger_id, name)
    VALUES (?, ?);
    
    SET @last_trigger_id = LAST_INSERT_ID();
    
    INSERT INTO trigger_snapshot (trigger_snapshot_id, trigger_id, snapshot_id)
    VALUES (?, @last_trigger_id, @last_snapshot_id);
    
    COMMIT;`;
}

function getSnapshotDetailFunc() { return `SELECT * FROM snapshot WHERE snapshot_id = ?;`;}

function getAngerIntensityFunc() { return`SELECT intensity FROM emotion_snapshot RIGHT JOIN emotion ON
emotion_snapshot.emotion_id = emotion.emotion_id WHERE emotion_snapshot.snapshot_id = ? AND emotion.emotion_id = ?;`;}

function getContemptIntensityFunc() { return `SELECT intensity FROM emotion_snapshot RIGHT JOIN emotion ON
emotion_snapshot.emotion_id = emotion.emotion_id WHERE emotion_snapshot.snapshot_id = ? AND emotion.emotion_id = ?;`;}

function getDisgustIntensityFunc() {return `SELECT intensity FROM emotion_snapshot RIGHT JOIN emotion ON
emotion_snapshot.emotion_id = emotion.emotion_id WHERE emotion_snapshot.snapshot_id = ? AND emotion.emotion_id = ?;`;}

function getEnjoymentIntensityFunc() {return `SELECT intensity FROM emotion_snapshot RIGHT JOIN emotion ON
emotion_snapshot.emotion_id = emotion.emotion_id WHERE emotion_snapshot.snapshot_id = ? AND emotion.emotion_id = ?;`;}

function getFearIntensityFunc() {return`SELECT intensity FROM emotion_snapshot RIGHT JOIN emotion ON
emotion_snapshot.emotion_id = emotion.emotion_id WHERE emotion_snapshot.snapshot_id = ? AND emotion.emotion_id = ?;`;}

function getSadnessIntensityFunc() {return `SELECT intensity FROM emotion_snapshot RIGHT JOIN emotion ON
emotion_snapshot.emotion_id = emotion.emotion_id WHERE emotion_snapshot.snapshot_id = ? AND emotion.emotion_id = ?;`;}

function getSurpriseIntensityFunc() {return `SELECT intensity FROM emotion_snapshot RIGHT JOIN emotion ON
emotion_snapshot.emotion_id = emotion.emotion_id WHERE emotion_snapshot.snapshot_id = ? AND emotion.emotion_id = ?;`;}

function getTriggerDetailFunc() {return `SELECT name, trigger_table.trigger_id FROM trigger_table LEFT JOIN trigger_snapshot
ON trigger_table.trigger_id = trigger_snapshot.trigger_id WHERE snapshot_id = ?;`;}

function updateTriggersFunc() {

    return `START TRANSACTION;
        
    UPDATE trigger_table SET name = ? WHERE trigger_id = ?;

    UPDATE trigger_table SET name = ? WHERE trigger_id = ?;

    UPDATE trigger_table SET name = ? WHERE trigger_id = ?;

    COMMIT;`;

}

function deleteSnapshotFunc() {

    return `START TRANSACTION;

    DELETE FROM emotion_snapshot WHERE snapshot_id = ?;

    DELETE FROM trigger_snapshot WHERE snapshot_id = ?;
    
    DELETE FROM trigger_table WHERE trigger_id = ?;

    DELETE FROM trigger_table WHERE trigger_id = ?;

    DELETE FROM trigger_table WHERE trigger_id = ?;
    
    DELETE FROM snapshot WHERE snapshot_id = ?;
    
    COMMIT;`;

} 

function insertUserFunc () {
    return `INSERT INTO user (user_id, first_name, last_name, registration_date, 
        birthdate, security_question_one, 
        security_answer_one, security_question_two, 
        security_answer_two, email, password) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

}


module.exports = {
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
    insertUserFunc
};