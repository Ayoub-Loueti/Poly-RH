const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);

// Route to block/unblock a user
router.post('/block', userController.blockUser);

module.exports = router;
