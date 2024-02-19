const dotenv = require('dotenv').config({ path: './config.env' });
const app = require('./app');
const fs = require('fs');
const https = require('https');

https.createServer({
    key: fs.readFileSync('/Applications/MAMP/conf/apache/ssl/localhost.key'),
    cert: fs.readFileSync('/Applications/MAMP/conf/apache/ssl/localhost.crt'),
}, app).listen(process.env.PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Express listening on port ${process.env.PORT}`);
});