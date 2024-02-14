const express = require('express');
const controller = require('../controller/apicontroller');
const router = express.Router();

router.get('/users', controller.getUsers);

router.post('/login', controller.postLogin);

module.exports = router;