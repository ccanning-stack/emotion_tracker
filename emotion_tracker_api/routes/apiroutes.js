const express = require('express');
const controller = require('../controller/apicontroller');
const router = express.Router();
const {checkAuth} = require('./../utils/middleware/authentication');

router.get('/users', controller.getUsers);
router.get('/snapshot-summary', checkAuth, controller.getSnapshotSummary);

router.post('/login', controller.postLogin);
router.post('/create-snapshot', checkAuth, controller.postCreateSnapshot);

module.exports = router;