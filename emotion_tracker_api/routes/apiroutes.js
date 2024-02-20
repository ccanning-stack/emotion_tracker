const express = require('express');
const controller = require('../controller/apicontroller');
const router = express.Router();
const auth = require('./../utils/middleware/authentication');

router.get('/users', controller.getUsers);

router.post('/login', controller.postLogin);
router.post('/create-snapshot', auth.checkAuth, controller.postCreateSnapshot);

module.exports = router;