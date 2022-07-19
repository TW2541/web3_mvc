const express = require('express');
const User = require('../models/User');
const Proposal = require('../models/Proposal');

const getProposalPage = (req, res) => {
    User.find({}, function(err, users) {
        res.render("proposal", {
            page_name : "proposal",
            msg :"",
            userLists: users
        });
    })
};

const addNewProposal = async (req, res) => {
    const {title, contractaddress} = req.body;
    try {
        const result = await Proposal.create({
            "title": title,
            "contractaddress": contractaddress
        });

        console.log(result);
        res.status(201).json({'msg' : `New Proposal : ${title} has been created`});
    }
    catch (err) {
        res.status(500).json({'msg' : err.message});
    }

}

module.exports = { getProposalPage, addNewProposal };