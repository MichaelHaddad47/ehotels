const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

router.post('/', guestController.registerGuest);

module.exports = router;
