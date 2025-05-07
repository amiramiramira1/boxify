const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const {
  validateBuyABox,
  validateUserId,
} = require("../validators/serviceValidator");
const handleValidationErrors = require("../validators/errorHandler");


router.route("/buyabox")
      .post(validateBuyABox,handleValidationErrors,serviceController.BuyABox);
router.route("/getallmyinfo/:userid")
      .get( validateUserId,handleValidationErrors,serviceController.getAllInfo);
 module.exports = router;
