const express = require('express');
const router = express.Router();
const controller = require('../controllers/registerController');

router.post('/register', controller.createNewUser);
router.get('/register', controller.getRegisterPage);

module.exports = router;