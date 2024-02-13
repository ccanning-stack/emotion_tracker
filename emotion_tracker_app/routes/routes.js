// Defines the endpoints and is associated with the controller layer

//import modules
const express = require('express');
const controller = require('./../controller/routes_controller');
const router = express.Router();

//route handling
router.get('/', controller.getRedirect);
router.get('/welcome', controller.getWelcomePage);
router.get('/register', controller.getRegisterPage);
router.get('/successful-registration', controller.getSuccessfulRegistrationPage);
router.get('/login', controller.getLoginPage);
router.get('/reset-password', controller.getResetPasswordPage);
router.get('/create-snapshot', controller.getCreateSnapshotPage);
//router.get('/edit-snapshot', controller.getEditSnapshotPage);
router.get('/snapshot-summary', controller.getSummaryPage);
router.get('/insights', controller.getInsightsPage);

router.get('/v1.1/api', controller.getMakeAPIRequest );

//export router
module.exports = router;