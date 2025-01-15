const express = require('express')
const router = express.Router();
const carsController = require('../controllers/carsController');

router.post('/post', carsController.createListing);

module.exports = router