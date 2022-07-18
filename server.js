const express = require('express');
const app  = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./configs/dbConn');
const homeRouter = require('./routes/home');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

connectDB();

app.set ( "view engine", "ejs" );

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', homeRouter, loginRouter, registerRouter);

mongoose.connection.once('open', () => {
    console.log("Connect to DB");
    app.listen(3000, () => console.log('server run listening on port 3000'));
});

