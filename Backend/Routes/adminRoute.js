const express = require('express');
const { registerAdmin, loginAdmin, getAllCustomers, getAllOwners, getAllFishes } = require('../Contollers/AdminController');
const { getAuthentication } = require('../MiddleWare/getAuth');
const router = express.Router();

router.post("/register",registerAdmin)

router.post("/login",loginAdmin)

router.get("/getAllCustomer",getAuthentication,getAllCustomers)


router.get("/getAllOwners",getAuthentication,getAllOwners)

router.get("/getAllFishes",getAuthentication,getAllFishes)
module.exports = router