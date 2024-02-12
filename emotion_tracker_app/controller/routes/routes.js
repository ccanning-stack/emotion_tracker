//import modules
const express = require('express');
const controller = require('./routes_controller');
const router = express.Router();

//route handling
router.get('/', controller.getMakeAPIRequest );


//export router
module.exports = router;