const express = require('express');
const controller = require('../controller/apicontroller');
const router = express.Router();
const {checkAuth} = require('../utils/middleware/authentication.js');
const {sanitiseData, validateNewUserData, validatePasswords } = require('../utils/functions/data_operations');

router.get('/snapshot-summary', sanitiseData(), checkAuth, controller.getSnapshotSummary);
router.get('/edit-snapshot/:id', sanitiseData(), checkAuth, controller.getSnapshotDetails);
router.get('/insights', sanitiseData(), checkAuth, controller.getInsights);

router.post('/login', sanitiseData(), controller.postLogin);
router.post('/new-user', validateNewUserData(), sanitiseData(), controller.postNewUser);
router.post('/create-snapshot', sanitiseData(), checkAuth, controller.postCreateSnapshot);
router.post('/reset-password-step1', sanitiseData(),controller.postConfirmUsername);
router.post('/reset-password-step2', sanitiseData(), controller.postConfirmSecurity);

router.patch('/change-password', validatePasswords(), sanitiseData(), controller.patchChangePassword);
router.patch('/edit-snapshot', sanitiseData(), checkAuth, controller.patchUpdateSnapshot);

router.delete('/delete-snapshot', sanitiseData(), checkAuth, controller.deleteSnapshot);

module.exports = router;