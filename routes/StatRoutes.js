// imports used
const express = require('express');
const statsController = require('../controllers/statsController');

// Make routes using express
const app = express.Router();

// routes
app.get('/waterlevelsave/value=:waterLevel', statsController.saveWaterLevelPercentage);
app.get('/waterlevel',statsController.getWaterStats);

module.exports = app;