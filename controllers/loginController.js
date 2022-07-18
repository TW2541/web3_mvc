const express = require('express');

const getLoginPage = (req, res) => {
    res.render("login", {
        page_name : "login"
    });
};

const getWelcomePage = (req, res) => {
     res.send('Welcome to Smart Invoice');
};

module.exports = {getLoginPage, getWelcomePage};