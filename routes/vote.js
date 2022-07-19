const express = require('express');
const router = express.Router();
const controller = require('../controllers/voteController');

router.get('/vote', controller.getProposalListPage);
router.get('/vote/:id', controller.getProposalDetailPage);

module.exports = router;