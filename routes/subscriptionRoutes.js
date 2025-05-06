const express = require("express");
const router = express.Router();
const subController = require("../controllers/subController");

router.route("/")
         .get(subController.getAllSubcriptions)
         .post( subController.createSubscription)


router.route("/:subid")
        .get( subController.getSubcriptionById)
        .patch( subController.updateSubscription)
        .delete(subController.deleteSubscription)





module.exports = router;