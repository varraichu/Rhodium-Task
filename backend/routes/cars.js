const express = require('express')
const router = express.Router();
const carsController = require('../controllers/carsController');

router.post('/post', carsController.createListing);
router.get('/get-cars', carsController.getListings);

module.exports = router