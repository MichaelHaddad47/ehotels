const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationsController');

router.post('/', reservationController.createReservation);
router.delete('/:id', reservationController.cancelReservation);

module.exports = router;
