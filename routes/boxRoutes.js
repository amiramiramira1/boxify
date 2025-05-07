const express = require("express");
const router = express.Router();
const boxController = require("../controllers/boxController");
const {
        validateBoxCreation,
        validateBoxUpdate,
        validateBoxId,
        validateBoxType,
        validateBudgetQuery,
} = require("../validators/boxValidator");
const handleValidationErrors = require("../validators/errorHandler");

router.route("/")
        .get(boxController.getAllBoxes)
        .post(validateBoxCreation, handleValidationErrors, boxController.createBox);

router.get("/budget", validateBudgetQuery, handleValidationErrors, boxController.getBoxesLteBudget);

router.get("/type/:type", validateBoxType, handleValidationErrors, boxController.getBoxByType);

router.route("/:boxid")
        .get(validateBoxId, handleValidationErrors, boxController.getBoxById)
        .patch( validateBoxUpdate, handleValidationErrors, boxController.updateBox)
        .delete(validateBoxId, handleValidationErrors, boxController.deleteBox);

module.exports = router;
