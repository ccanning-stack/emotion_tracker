const express = require('express');
const controller = require('../controller/apicontroller');
const router = express.Router();
const {checkAuth} = require('./../utils/middleware/authentication');

router.get('/users', controller.getUsers);
router.get('/snapshot-summary', checkAuth, controller.getSnapshotSummary);
router.get('/edit-snapshot/:id', checkAuth, controller.getSnapshotDetails);

router.post('/login', controller.postLogin);
router.post('/new-user', controller.postNewUser);
router.post('/create-snapshot', checkAuth, controller.postCreateSnapshot);

router.patch('/edit-snapshot/:id', checkAuth, controller.patchUpdateSnapshot);

router.delete('/delete-snapshot/:id', checkAuth, controller.deleteSnapshot);

module.exports = router;