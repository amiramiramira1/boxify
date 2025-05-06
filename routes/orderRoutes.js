const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { body } = require("express-validator");


router.route("/").get(orderController.getAllOrders);
         



router.route("/:orderid")
        .get( orderController.getOrderById)
        .patch([
                // Validation rules
                
                body("address").optional().notEmpty().withMessage("Address is required"),       
                body("deliveryDate").optional()
                  .isISO8601()
                  .toDate()
                  .withMessage("Delivery date must be a valid ISO 8601 date"),
                
              ], orderController.updateOrder)
        .delete(orderController.deleteOrder)

router.get('/user/:userid', orderController.getOrdersByUser);



module.exports = router;



