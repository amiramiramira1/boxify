const express = require("express");
const router = express.Router();
const subController = require("../controllers/subController");

router.route("/").get(subController.getAllSubcriptions)
         


router.route("/:subid")
        .get( subController.getSubcriptionById)
        .patch( subController.updateSubscription)
        .delete(subController.deleteSubscription)

router.get('/user/:userid', subController.getSubscriptionsByUser);



module.exports = router;