//This should contain business logic and data manipulation code
const axios = require('axios');

exports.getRedirect = async (req,res) => {
    res.redirect('/welcome');
}

exports.getWelcomePage = async (req,res) => {
    res.render('welcome');
}

exports.getRegisterPage = async (req,res) => {
    res.render('register');
}

exports.getSuccessfulRegistrationPage = async (req,res) => {
    res.render('successful-registration');
}

exports.getLoginPage = async (req,res) => {
    res.render('login');
}

exports.getResetPasswordPage = async (req,res) => {
    res.render('reset-password');
}

exports.getCreateSnapshotPage = async (req,res) => {
    res.render('create-snapshot');
}

exports.getInsightsPage = async (req,res) => {
    res.render('insights');
}

exports.getSummaryPage = async (req,res) => {
    res.render('summary');
}

exports.getMakeAPIRequest = async (req, res) => {

    const endpoint = 'http://localhost:3002/';

    try {
            const response = await axios.get(endpoint)
            console.log("API Endpoint returned");
            console.log(response.data);
            res.json(response.data);
           
        } catch(error) {
            console.log("ERROR connecting to API");
            console.log(error);
            res.status(500).json({error: "Failed to fetch data from API"});
        };

}
