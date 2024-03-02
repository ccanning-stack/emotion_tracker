const { body} = require('express-validator');
//https://github.com/validatorjs/validator.js?tab=readme-ov-file#sanitizers
//https://github.com/express-validator/express-validator/issues/1137

function sanitiseData() {
    return body('*').escape().trim();
}

module.exports = { sanitiseData};