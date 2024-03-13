//This should contain business logic and data manipulation code
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const {dateFormatFunc, dateFormatDataSetFunc} = require('../public/js/datescript2');
const {
    calculateNumberSnapshotsFunc, 
    calculateEmotionAveragesFunc, 
    obtainTop3TriggersFunc, 
    filterSnapshotsByTriggerFunc,
    getTopTriggerFunc,
    calculateDifferencesFunc,
    formatValuesFunc } = require('../public/js/stats');

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
    res.render('welcome', { logoutMessage: null });
}

exports.getRegisterPage = async (req, res) => {
    res.render('register', {
        emailExistsMsg: null,
        validationErrorsArray: null
    });
}

exports.getLoginPage = async (req, res) => {
    res.render('login', { accountCreatedMsg: null, invalidCredentialsMsg: null, 
    passwordChangedMsg:null });
}

exports.getConfirmUserPage = async (req, res) => {
    res.render('reset-password-step1', {userNotFoundmsg: null});
}

exports.getVerifySecurityPage = async (req, res) => {
    res.render('reset-password-step2');
}

exports.getChangePasswordPage = async (req, res) => {
    res.render('change-password');
}

exports.getCreateSnapshotPage = async (req, res) => {
    res.render('create-snapshot');
}

exports.postAPINewUser = async (req, res) => {

    const endpoint = 'https://localhost:8443/new-user';

    let response = null;
    try {
        response = await axios.post(endpoint, req.body, { httpsAgent });

        res.render('login', {
            accountCreatedMsg: "Account successfully created!  You can now log in.",
            invalidCredentialsMsg: null,
            passwordChangedMsg:null
        });

    } catch (error) {
        if (error.response.status === 409) {
            res.render('register', {
                emailExistsMsg: "The email address provided already has an account associated with it",
                validationErrorsArray: null
            });
        } else if (error.response.status === 422){
            res.render('register', {
                emailExistsMsg: null,
                validationErrorsArray: error.response.data
            });

        } else {
            res.status(500).json({ error: `${error}` });
        };
    }
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

        //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    } catch (error) {
        if (error.response.status === 401) {
            res.render('login', {
                accountCreatedMsg: null,
                invalidCredentialsMsg: "Incorrect username and/or password",
                passwordChangedMsg:null
            });
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

        res.render('summary', { apiData: response.data, 
            apiMessage: "Snapshot created successfully!" });

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

        res.render('summary', { apiData: response.data, apiMessage: null });

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


    const endpoint = `https://localhost:8443/edit-snapshot`;

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

    const endpoint = `https://localhost:8443/delete-snapshot`;

    //extract for use with axios as headers need to be set separately
    token = req.headers['authorization'];

    try {

        const response = await axios.delete(endpoint, {
            data: req.body,
            headers: { 'authorization': `${token}` }
        }, { httpsAgent });
        res.render('summary', { apiData: response.data, 
            apiMessage: "Snapshot deletion successful!" });

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


exports.postAPIConfirmUsername = async (req, res) => {

    const endpoint = 'https://localhost:8443/reset-password-step1';


    try {
        const response = await axios.post(endpoint, req.body,{ httpsAgent });

        res.render('reset-password-step2', { apiData: response.data, wrongAnswersMsg:null});

    } catch (error) {
        if (error.response.status === 404) {
            return res.render('reset-password-step1', {
                userNotFoundmsg: "Username not found"
            });
        }
        res.status(500).json({ error: `${error}` });
    };

}

exports.postAPIConfirmSecurity = async (req, res) => {

    const endpoint = 'https://localhost:8443/reset-password-step2';


    try {
        const response = await axios.post(endpoint, req.body,{ httpsAgent });

        res.render('change-password', { apiData: response.data, validationErrorsArray: null});

    } catch (error) {
        if (error.response.status === 403) {
            return res.render('reset-password-step2', {
                wrongAnswersMsg: "Incorrect answers to security questions",
                apiData: error.response.data
            });
        }
        res.status(500).json({ error: `${error}` });
    };

}

exports.patchAPIChangePassword = async (req, res) => {

    const endpoint = 'https://localhost:8443/change-password';


    try {
        const response = await axios.patch(endpoint, req.body,{ httpsAgent });

        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        res.render('login', { passwordChangedMsg: "Password successfully changed!  Please log in using new password.", 
        accountCreatedMsg: null, invalidCredentialsMsg: null});

    } catch (error) {
        if (error.response.status === 422){
            return res.render('change-password', {
                validationErrorsArray: error.response.data,
                apiData: null
            })};
        res.status(500).json({ error: `${error}` });
    };

}


exports.getChangePasswordPageLoggedIn = async (req, res) => {

    const responseData = {user_id: req.user.user};

    res.render('change-password', { apiData: responseData, validationErrorsArray:null});
}


exports.getAPIInsightsPage = async (req, res) => {

    const endpoint = 'https://localhost:8443/insights';

    //extract for use with axios as headers need to be set separately
    token = req.headers['authorization'];

    try {
        const response = await axios.get(endpoint, {
            headers: { 'authorization': `${token}` }
        }, { httpsAgent });

        //format dates
        const datesFormattedData = dateFormatDataSetFunc(response.data);

        //calculate initial stats
        const noSnapshots= calculateNumberSnapshotsFunc(response.data);
        const emotionAverages = calculateEmotionAveragesFunc(response.data);
        const topTriggers = obtainTop3TriggersFunc(response.data);

        //obtain top 3 triggers
        const no1Trigger = getTopTriggerFunc(topTriggers, 0);
        const no2Trigger = getTopTriggerFunc(topTriggers, 1);
        const no3Trigger = getTopTriggerFunc(topTriggers, 2);

        //obtain snapshots per top trigger
        const snapshotsTrigger1 = filterSnapshotsByTriggerFunc(response.data, no1Trigger);
        const snapshotsTrigger2 = filterSnapshotsByTriggerFunc(response.data, no2Trigger);
        const snapshotsTrigger3 = filterSnapshotsByTriggerFunc(response.data, no3Trigger);

        //calculate averages per top trigger
        const averagesTrigger1 = calculateEmotionAveragesFunc(snapshotsTrigger1);
        const averagesTrigger2 = calculateEmotionAveragesFunc(snapshotsTrigger2);
        const averagesTrigger3 = calculateEmotionAveragesFunc(snapshotsTrigger3);

        //comparison when trigger is present vs general averages
        const averageComparisonTrigger1 = calculateDifferencesFunc(emotionAverages, averagesTrigger1);
        const averageComparisonTrigger2 = calculateDifferencesFunc(emotionAverages, averagesTrigger2);
        const averageComparisonTrigger3 = calculateDifferencesFunc(emotionAverages, averagesTrigger3);

        //format all values before rendering
        const formattedTrig1Averages = formatValuesFunc(averageComparisonTrigger1);
        const formattedTrig2Averages = formatValuesFunc(averageComparisonTrigger2);
        const formattedTrig3Averages = formatValuesFunc(averageComparisonTrigger3);

        res.render('insights', { apiData: datesFormattedData, noSnapshots, emotionAverages, topTriggers, 
            formattedTrig1Averages, formattedTrig2Averages, formattedTrig3Averages });

    } catch (error) {
        res.status(500).json({ error: `${error}` });
    };
}

exports.get404 = async (req, res) => {

    res.status(404).send("<h1>Sorry, this page does not exist</h1>");
}