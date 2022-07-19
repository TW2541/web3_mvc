const express = require('express');
const app  = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const flash = require('connect-flash');
const connectDB = require('./configs/dbConn');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const homeRouter = require('./routes/home');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const proposalRouter = require('./routes/proposal');
const voteRouter = require('./routes/vote');


connectDB();

app.set ( "view engine", "ejs" );

app.use('/dist',express.static(__dirname + '/dist'));

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/', homeRouter, loginRouter, registerRouter);

app.use(verifyJWT);
app.use('/', proposalRouter, voteRouter);

mongoose.connection.once('open', () => {
    console.log("Connect to DB");
    app.listen(3000, () => console.log('server run listening on port 3000'));
});

