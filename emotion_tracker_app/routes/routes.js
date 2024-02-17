// Defines the endpoints and is associated with the controller layer

//import modules
const express = require('express');
const controller = require('./../controller/routes_controller');
const router = express.Router();
const auth = require('./../utils/middleware/authentication');

//route handling
router.get('/', controller.getRedirect);
router.get('/welcome', controller.getWelcomePage);
router.get('/register', controller.getRegisterPage);
router.get('/successful-registration', auth.checkAuth, controller.getSuccessfulRegistrationPage);
router.get('/login', controller.getLoginPage);
router.get('/reset-password-step1', controller.getConfirmUserPage);
router.get('/reset-password-step2', controller.getResetPasswordPage);
router.get('/create-snapshot', auth.checkAuth, controller.getCreateSnapshotPage);
//router.get('/edit-snapshot', authenticateToken, controller.getEditSnapshotPage);
router.get('/snapshot-summary', auth.checkAuth, controller.getSummaryPage);
router.get('/insights', auth.checkAuth, controller.getInsightsPage);

router.get('/v1.1/api', controller.getMakeAPIRequest );

router.post('/login', controller.postAPILoginRequest);

//export router
module.exports = router;