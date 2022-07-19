const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const jwtToken = req.cookies.jwt;
    if(jwtToken) {
        const username = jwt.verify(jwtToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(username);
        req.username = username;
    }
    else {
        res.status(401).json({'error' : 'Unauthorized'});
    }
    next();
}

module.exports = verifyJWT