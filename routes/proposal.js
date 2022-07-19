const express = require('express');
const router = express.Router();
const controller = require('../controllers/proposalController');

router.get('/proposal', controller.getProposalPage);
router.post('/proposal/new', controller.addNewProposal);

module.exports = router;