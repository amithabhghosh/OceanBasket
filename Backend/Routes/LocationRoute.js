const express = require('express');
const { updateLocationOfCustomer, updateOwnerLocation } = require('../Contollers/LocationControllers');
const { getAuthentication } = require('../MiddleWare/getAuth');

const router = express.Router();

router.put("/locationUpdateByCustomer",getAuthentication, updateLocationOfCustomer)

router.put("/locationByOwner",getAuthentication,updateOwnerLocation)

module.exports = router