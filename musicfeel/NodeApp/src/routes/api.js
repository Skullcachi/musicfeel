const express = require('express');
const router = express.Router();

const apiControllers = require('../controllers/apiControllers');

router.get('/getCurrentWeather', apiControllers.get);

module.exports = router;