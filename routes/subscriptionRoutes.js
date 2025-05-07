const express = require("express");
const router = express.Router();
const subController = require("../controllers/subController");
const {
        validateSubscriptionCreation,
        validateSubscriptionUpdate,
        validateSubscriptionId,
        validateUserId,
      } = require("../validators/subscriptionValidator");
const handleValidationErrors = require("../validators/errorHandler");

router.route("/")
  .get(subController.getAllSubcriptions)
  .post(validateSubscriptionCreation, handleValidationErrors, subController.createSubscription);

router.route("/:subid")
  .get(validateSubscriptionId, handleValidationErrors, subController.getSubcriptionById)
  .patch(validateSubscriptionUpdate, handleValidationErrors, subController.updateSubscription)
  .delete(validateSubscriptionId, handleValidationErrors, subController.deleteSubscription);

router.route('/user/:userid')
  .get(validateUserId, handleValidationErrors, subController.getSubscriptionsByUser);

module.exports = router;
