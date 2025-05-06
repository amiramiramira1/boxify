const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const { body } = require("express-validator");


router.route("/buyabox")
      .post([
        // Validation rules
        body("address").notEmpty().withMessage("Address is required"),
        body("deliveryDate").optional()
          .isISO8601()
          .toDate()
          .withMessage("Delivery date must be a valid ISO 8601 date"),
        body("user").notEmpty().withMessage("User ID is required"),
        body("box").notEmpty().withMessage("Box ID is required"),
      ], serviceController.BuyABox);
 module.exports = router;