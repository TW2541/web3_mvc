const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const getLoginPage = (req, res) => {
    res.render("login", {
        page_name : "login",
        fromRegister : false
    });
};

const getWelcomePage = (req, res) => {
     res.send('Welcome to Smart Invoice');
};

const authLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({'error' : 'Every fields must be filled'});
    const foundUser = await User.findOne({username: username}).exec();
    // check if password is corrected
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWT
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken
        User.updateOne({username: {$eq:username}}, {refreshToken : refreshToken}, 
            function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                // console.log("Updated Token");
            }
        });
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.render("proposal", {
            page_name : "proposal",
            msg : `New user ${username} has been created`
        });
    } else {
        res.status(401).json({'error' : 'Unauthorized'});
    }
}


module.exports = {getLoginPage, getWelcomePage, authLogin};