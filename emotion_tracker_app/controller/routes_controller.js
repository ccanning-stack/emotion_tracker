//This should contain business logic and data manipulation code
const axios = require('axios');
const https = require('https');
const fs = require('fs');

// Trust an external service's self-signed certificate
// for outbound requests from server
// Chat GPT (www.chat.openai.com)
const externalServiceCACert = fs.readFileSync('/Applications/MAMP/conf/apache/ssl/localhost.crt');

const httpsAgent = new https.Agent({
  ca: externalServiceCACert,
});

exports.getRedirect = async (req, res) => {
    res.redirect('/welcome');
}

exports.getWelcomePage = async (req, res) => {
    res.render('welcome');
}

exports.getRegisterPage = async (req, res) => {
    res.render('register');
}

exports.getSuccessfulRegistrationPage = async (req, res) => {
    res.render('successful-registration');
}

exports.getLoginPage = async (req, res) => {
    res.render('login');
}

exports.getConfirmUserPage = async (req, res) => {
    res.render('reset-password-step1');
}

exports.getResetPasswordPage = async (req, res) => {
    res.render('reset-password-step2');
}

exports.getCreateSnapshotPage = async (req, res) => {
    res.render('create-snapshot');
}

exports.getInsightsPage = async (req, res) => {
    res.render('insights');
}

exports.getSummaryPage = async (req, res) => {
    res.render('summary');
}

exports.getMakeAPIRequest = async (req, res) => {

    const endpoint = 'https://localhost:8443/';

    try {
        const response = await axios.get(endpoint)
        console.log("API Endpoint returned");
        console.log(response.data);
        res.json(response.data);

    } catch (error) {
        console.log("ERROR connecting to API");
        console.log(error);
        res.status(500).json({ error: "Failed to fetch data from API" });
    };

}

exports.postAPILogin = async (req, res) => {

    const endpoint = 'https://localhost:8443/login';

    try {
        const response = await axios.post(endpoint, req.body, { httpsAgent });
        console.log("API Endpoint returned");
        console.log(response.data);
        const token = response.data.accessToken;

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        res.redirect('/create-snapshot');

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `${error}` });
    };

}

exports.postAPICreateSnapshot = async (req, res) => {

    const endpoint = 'https://localhost:8443/create-snapshot';
    token = req.headers['authorization'];

    try {
        const response = await axios.post(endpoint, req.body, {
            headers: {'authorization': `${token}`}
        }, { httpsAgent });
        console.log("API Endpoint returned");
        console.log(response.data);
        
        res.redirect('/snapshot-summary');

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `${error}` });
    };

}
