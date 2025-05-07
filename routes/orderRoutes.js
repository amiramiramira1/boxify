const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const {
        validateOrderCreation,
        validateOrderUpdate,
        validateOrderId,
        validateUserId,
      } = require("../validators/orderValidator");
const handleValidationErrors = require("../validators/errorHandler");

router.route("/")
      .get(orderController.getAllOrders)
      .post(validateOrderCreation, handleValidationErrors, orderController.createOrder);

router.route("/:orderid")
      .get(validateOrderId, handleValidationErrors, orderController.getOrderById)
      .patch(validateOrderUpdate, handleValidationErrors, orderController.updateOrder)
      .delete(validateOrderId, handleValidationErrors, orderController.deleteOrder);

router.route('/user/:userid')
      .get(validateUserId, handleValidationErrors, orderController.getOrdersByUser);

module.exports = router;
