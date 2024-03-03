const express = require('express');
const controller = require('../controller/apicontroller');
const router = express.Router();
const {checkAuth} = require('../utils/middleware/authentication.js');
const {sanitiseData, validateNewUserData } = require('../utils/functions/data_operations');

router.get('/users', sanitiseData(), controller.getUsers);
router.get('/snapshot-summary', sanitiseData(), checkAuth, controller.getSnapshotSummary);
router.get('/edit-snapshot/:id', sanitiseData(), checkAuth, controller.getSnapshotDetails);

router.post('/login', sanitiseData(), controller.postLogin);
router.post('/new-user', validateNewUserData(), sanitiseData(), controller.postNewUser);
router.post('/create-snapshot', sanitiseData(), checkAuth, controller.postCreateSnapshot);

router.patch('/edit-snapshot/:id', sanitiseData(), checkAuth, controller.patchUpdateSnapshot);

router.delete('/delete-snapshot/:id', sanitiseData(), checkAuth, controller.deleteSnapshot);

module.exports = router;