//This should contain business logic and data manipulation code
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const dateFormatFunc = require('../public/js/datescript2');

// Trust an external service's self-signed certificate
// for outbound requests from server
// assisted by Chat GPT (www.chat.openai.com)
const externalServiceCACert = fs.readFileSync('/Applications/MAMP/conf/apache/ssl/localhost.crt');

const httpsAgent = new https.Agent({
    ca: externalServiceCACert,
});

exports.getRedirect = async (req, res) => {
    res.redirect('/welcome');
}

exports.getWelcomePage = async (req, res) => {
    res.render('welcome', { logoutMessage: "" });
}

exports.getRegisterPage = async (req, res) => {
    res.render('register');
}

exports.getSuccessfulRegistrationPage = async (req, res) => {
    res.render('successful-registration');
}

exports.getLoginPage = async (req, res) => {
    res.render('login', { accountCreatedMsg: "", invalidCredentialsMsg:"" });
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

exports.postAPINewUser = async (req, res) => {

    const endpoint = 'https://localhost:8443/new-user';

    try {
        const response = await axios.post(endpoint, req.body, { httpsAgent });
        console.log("API new user response: ", response.data);

        res.render('login', { accountCreatedMsg: "Account successfully created!  You can now log in.", 
        invalidCredentialsMsg: "" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `${error}` });
    };

}


exports.postAPILogin = async (req, res) => {

    const endpoint = 'https://localhost:8443/login';

    try {
        const response = await axios.post(endpoint, req.body, { httpsAgent });

        //extract jwt for setting in cookie for use henceforth
        const token = response.data.accessToken;

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        res.redirect('/create-snapshot');

    } catch (error) {
        if (error.response.status === 401) {

            res.render('login', { accountCreatedMsg:"", 
            invalidCredentialsMsg: "Incorrect username and/or password" });

        }
        else {
            res.status(500).json({ error: `${error}` });
        }
    };

}


exports.postAPICreateSnapshot = async (req, res) => {

    const endpoint = 'https://localhost:8443/create-snapshot';

    //extract for use with axios as headers need to be set separately
    token = req.headers['authorization'];

    try {
        const response = await axios.post(endpoint, req.body, {
            headers: { 'authorization': `${token}` }
        }, { httpsAgent });

        console.log("Create Snapshot API Endpoint returned with this data:");
        console.log(response.data);

        res.redirect('summary');

    } catch (error) {
        res.status(500).json({ error: `${error}` });
    };

}

exports.getAPISnapshotSummary = async (req, res) => {

    const endpoint = 'https://localhost:8443/snapshot-summary';

    //extract for use with axios as headers need to be set separately
    token = req.headers['authorization'];

    try {
        const response = await axios.get(endpoint, {
            headers: { 'authorization': `${token}` }
        }, { httpsAgent });

        res.render('summary', { apiData: response.data, apiMessage: "" });

    } catch (error) {
        res.status(500).json({ error: `${error}` });
    };
}

exports.getAPISnapshotDetails = async (req, res) => {

    const id = req.params.id;

    const endpoint = `https://localhost:8443/edit-snapshot/${id}`;

    //extract for use with axios as headers need to be set separately
    token = req.headers['authorization'];

    try {
        const response = await axios.get(endpoint, {
            headers: { 'authorization': `${token}` }
        }, { httpsAgent });

        //extract date from api response for conversion and passing into EJS template
        const dbDate = response.data.snap[0].datetime_created;

        res.render('edit-snapshot', { apiData: response.data, apiDate: dateFormatFunc(dbDate) });

    } catch (error) {
        res.status(500).json({ error: `${error}` });
    };
}


exports.patchAPIUpdateSnapshot = async (req, res) => {

    const id = req.params.id;

    const endpoint = `https://localhost:8443/edit-snapshot/${id}`;

    //extract for use with axios as headers need to be set separately
    token = req.headers['authorization'];

    try {
        const response = await axios.patch(endpoint, req.body, {
            headers: { 'authorization': `${token}` }
        }, { httpsAgent });

        res.render('summary', { apiData: response.data, apiMessage: "Snapshot update successful!" });

    } catch (error) {
        res.status(500).json({ error: `${error}` });
    };

}

exports.deleteAPISnapshot = async (req, res) => {

    const id = req.params.id;

    const endpoint = `https://localhost:8443/delete-snapshot/${id}`;

    //extract for use with axios as headers need to be set separately
    token = req.headers['authorization'];

    try {

        const response = await axios.delete(endpoint, {
            data: req.body,
            headers: { 'authorization': `${token}` }
        }, { httpsAgent });
        console.log("DELETE API RESPONSE:", response.data);
        res.render('summary', { apiData: response.data, apiMessage: "Snapshot deletion successful!" });

    } catch (error) {
        res.status(500).json({ error: `${error}` });
    };

}

exports.getLogout = (req, res) => {

    //https://stackoverflow.com/questions/21978658/invalidating-json-web-tokens
    //https://expressjs.com/en/api.html#res.clearCookie

    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        res.render('welcome', { logoutMessage: "Logout successful" });

    } catch (error) {
        res.status(500).json({ error: `${error}` });
    };
}
