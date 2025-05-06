const express = require("express");
const router = express.Router();
const boxController = require("../controllers/boxController");


router.route("/")
         .get(boxController.getAllBoxes)
         .post( boxController.createBox)
         
router.get("/budget", boxController.getBoxesLteBudget); // Get boxes within budget

router.get("/type/:type", boxController.getBoxByType);

router.route("/:boxid")
        
        .get( boxController.getBoxById)
        .patch( boxController.updateBox)
        .delete(boxController.deleteBox)
        



module.exports = router;