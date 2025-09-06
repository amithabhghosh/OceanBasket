const express = require('express');
const { createOrder,getOrderByOwner,getOrdersByUser, getOrderByOrderId, getOrderByShopId ,updateOrderStatusByOwner, getChartDataForOrders} = require('../Contollers/OrderControllers');
const { getAuthentication } = require('../MiddleWare/getAuth');
const router = express.Router();


router.post('/create',getAuthentication, createOrder);


router.get("/getOrdersByOwner",getAuthentication,getOrderByOwner)


router.get("/getOrderByUser",getAuthentication,getOrdersByUser)


router.get("/getOrderByOrderId/:orderId",getAuthentication,getOrderByOrderId)


router.get("/getOrderByShop",getAuthentication,getOrderByShopId)

router.put("/updateOrderByOwner/:orderId",getAuthentication,updateOrderStatusByOwner)

router.get("/getChartDataForOrders",getAuthentication,getChartDataForOrders)
module.exports = router;

