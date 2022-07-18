const express = require('express');

const getHomePage = (req, res) => {
    res.render("home", {
        page_name : "home"
    });
};

module.exports = { getHomePage };