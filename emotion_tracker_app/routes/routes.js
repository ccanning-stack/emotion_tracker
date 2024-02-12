// Defines the endpoints and is associated with the controller layer





//import modules
const express = require('express');
const controller = require('../model/aggregation_service');
const router = express.Router();

//route handling
router.get('/', controller.getMakeAPIRequest );

//export router
module.exports = router;