const jwt = require("jsonwebtoken");
/*
https://www.youtube.com/watch?v=mbsmsi7l3r4
*/

//checking token is valid and extracting/setting it in req headers
exports.checkAuth = (req, res, next) => {

    const token = req.cookies['token'];
    //check for undefined or inexistent token
    if (token == null || !token) {
        return res.sendStatus(401); //not sent token- Unauthorised
    }

    //verify token is valid
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {

            //Login timeout script for improved user experience- with help from chatGPT
            //https://www.w3schools.com/js/js_window_location.asp
            //forbidden/403 status code
            const loginUrl = 'https://localhost/login';
            return res.status(403).send(`
        <html>
            <body>
                <script>
                    setTimeout(function() {
                        window.location.href = '${loginUrl}';
                    }, 5000); // Redirects after 5 seconds
                </script>
                <p>Session has timed out, you will be returned to the login page in 5 seconds. 
                If not, click <a href="${loginUrl}">here</a> to login again.</p>
            </body>
        </html>
    `);
        }

        //at this point token is valid- set in req headers
        req.headers['authorization'] = `Bearer ${token}`;

        //at this point token is valid- set user in req obj for subsequent use
        req.user = user;
        next();
    })
};
