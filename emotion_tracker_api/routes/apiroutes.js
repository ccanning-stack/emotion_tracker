const express = require('express');
const controller = require('./../controllers/apicontroller');
const router = express.Router();

router.get('/', controller.getUsers);

module.exports = router;