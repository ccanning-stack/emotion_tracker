// Defines the endpoints and is associated with the controller layer
// https://www.linkedin.com/advice/0/how-do-you-use-encoding-escaping-techniques-prevent#:~:text=For%20example%2C%20if%20you%20have,%26%2C%20%22%2C%20and%20%27.
// https://www.npmjs.com/package/express-validator
// https://express-validator.github.io/docs


//import modules
const express = require('express');
const controller = require('./../controller/routes_controller');
const router = express.Router();
const { checkAuth } = require('../utils/middleware/authentication.js');

//route handling
router.get('/', controller.getRedirect);
router.get('/welcome', controller.getWelcomePage);
router.get('/register', controller.getRegisterPage);
router.get('/login', controller.getLoginPage);
router.get('/reset-password-step1', controller.getConfirmUserPage);
router.get('/reset-password-step2', controller.getResetPasswordPage);
router.get('/create-snapshot', checkAuth, controller.getCreateSnapshotPage);
router.get('/edit-snapshot/:id', checkAuth, controller.getAPISnapshotDetails);
router.get('/summary', checkAuth, controller.getAPISnapshotSummary);
router.get('/logout', checkAuth, controller.getLogout);

router.get('/insights', checkAuth, controller.getInsightsPage);

//router.get('/v1.1/api', controller.getMakeAPIRequest );

router.post('/login', controller.postAPILogin);
router.post('/new-user', controller.postAPINewUser);
router.post('/create-snapshot', checkAuth, controller.postAPICreateSnapshot);
router.post('/edit-snapshot/:id', checkAuth, controller.patchAPIUpdateSnapshot);
router.post('/delete-snapshot/:id', checkAuth, controller.deleteAPISnapshot);

//export router
module.exports = router;