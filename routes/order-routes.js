const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order-controller");

router.post("/", orderController.placeOrder);
router.put("/", orderController.modifyOrder);
router.delete("/", orderController.cancelOrder);
router.post("/status", orderController.getOrderStatus);





module.exports=router;