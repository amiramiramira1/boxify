const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { body } = require("express-validator");


router.route("/")
         .get(orderController.getAllOrders)
         .post(  [
                // Validation rules
                
                body("address").notEmpty().withMessage("Address is required"),
                body("deliveryDate").notEmpty().withMessage("deliveryDate is required"),
                body("price").notEmpty().withMessage("price is required"),
                
                
                
                body("price").optional().isFloat({ min: 1 }).withMessage("price must be a positive number")
              ]
              , orderController.createOrder)



router.route("/:orderid")
        .get( orderController.getOrderById)
        .patch([
                // Validation rules
                
                body("address").optional().notEmpty().withMessage("Address is required"),
                body("deliveryDate").optional().notEmpty().withMessage("deliveryDate is required"),
                body("price").optional().notEmpty().withMessage("price is required"),
                
                
                body("deliveryDate").optional()
                  .isISO8601()
                  .toDate()
                  .withMessage("Delivery date must be a valid ISO 8601 date"),
                body("price").optional().isFloat({ min: 1 }).withMessage("price must be a positive number")
              ], orderController.updateOrder)
        .delete(orderController.deleteOrder)
        



module.exports = router;



