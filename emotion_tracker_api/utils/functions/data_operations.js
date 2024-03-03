const { body, check, validationResult } = require('express-validator');
//https://github.com/validatorjs/validator.js?tab=readme-ov-file#sanitizers
//https://github.com/express-validator/express-validator/issues/1137
//https://express-validator.github.io/docs/6.6.0/sanitization/

function sanitiseData() {
    return body('*').escape().trim();
}

function validateNewUserData() {

    const validatorChain= [ check('email_add').isEmail().withMessage('Please verify email format'),
    check('*').not().isEmpty().withMessage('All fields need populated'),
    check('initial_password').isLength({ min: 8, max: 20 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Passwords must be of length 8-20 and contain at minimum one uppercase letter, one lowercase letter, and one number'),
    check('password_confirmation').custom((value, { req }) => {
    return value === req.body.initial_password;
  }).withMessage('Passwords must match') ];

  return validatorChain;

}

function validatePasswords() {

  const validatorChain= [
  check('pwd_change_1').isLength({ min: 8, max: 20 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .withMessage('Passwords must be of length 8-20 and contain at minimum one uppercase letter, one lowercase letter, and one number'),
  check('pwd_change_2').custom((value, { req }) => {
  return value === req.body.pwd_change_1;
}).withMessage('Passwords must match') ];

return validatorChain;

}

module.exports = { sanitiseData, validateNewUserData, validatePasswords };