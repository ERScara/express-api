const express = require('express');
const productRouter = require('./products');
const Router = express.Router();

module.exports = { Router, productRouter };