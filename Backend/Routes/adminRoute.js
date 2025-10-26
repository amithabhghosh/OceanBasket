const express = require('express');
const { registerAdmin, loginAdmin, getAllCustomers, getAllOwners, getAllFishes, getAllOrders, updateOrderDelivered, updateCustomerVerify, updateOwnerverify, addpercentageByAdmin } = require('../Contollers/AdminController');
const { getAuthentication } = require('../MiddleWare/getAuth');
const router = express.Router();

router.post("/register",registerAdmin)

router.post("/login",loginAdmin)

router.get("/getAllCustomer",getAuthentication,getAllCustomers)


router.get("/getAllOwners",getAuthentication,getAllOwners)


router.get("/getAllFishes",getAuthentication,getAllFishes)


router.get("/getAllOrders",getAuthentication,getAllOrders)


router.put("/updateDelivered/:orderId",(req, res, next) => {
  console.log("Route hit!", req.params.orderId, req.body);
  next();
},getAuthentication,updateOrderDelivered)

router.put("/updateVerifyCustomer/:userId",getAuthentication,updateCustomerVerify)

router.put("/updateVerifyOwner/:ownerId",getAuthentication,updateOwnerverify)


router.post("/addpercentage",getAuthentication,addpercentageByAdmin)
module.exports = router