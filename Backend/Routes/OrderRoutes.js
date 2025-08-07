const express = require('express');
const { createOrder } = require('../Contollers/OrderControllers');
const { getAuthentication } = require('../MiddleWare/getAuth');
const router = express.Router();


router.post('/create',getAuthentication, createOrder);

module.exports = router;

