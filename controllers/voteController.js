const express = require('express');
const User = require('../models/User');
const Proposal = require('../models/Proposal');
const { ethers } = require("ethers");

const getProposalListPage = (req, res) => {
    Proposal.find({}, function(err, proposals) {
        res.render("vote", {
            page_name : "vote",
            msg :"",
            proposalLists: proposals
        });
    })
};

const getProposalDetailPage = async (req, res) => {
    const contractAddress = req.params.id;
    const proposalResult = await Proposal.findOne({contractaddress: contractAddress}).exec();
    const shortAddress = proposalResult.contractaddress.slice(1,);
    
    res.render("detail", {
        page_name : "vote",
        msg :"",
        proposalTitle: proposalResult.title,
        proposalContractAddress: proposalResult.contractaddress
    });

};

module.exports = { getProposalListPage, getProposalDetailPage };