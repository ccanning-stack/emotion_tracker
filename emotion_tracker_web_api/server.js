const dotenv = require('dotenv').config({ path: './config.env' });
const app = require('./app');


app.listen(process.env.PORT, (err) => {
    if (err) return console.log(err);
    console.log(`API listening on port ${process.env.PORT}`);
});