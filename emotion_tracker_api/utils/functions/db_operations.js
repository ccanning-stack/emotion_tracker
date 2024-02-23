function newSnapShotSQL() {

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

module.exports = newSnapShotSQL;