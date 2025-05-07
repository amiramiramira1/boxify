const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
    validateUserCreation,
    validateUserUpdate,
    validateUserId,
  } = require("../validators/userValidator");
const handleValidationErrors = require("../validators/errorHandler");

 


router.route("/")
    .get(userController.getAllUsers)
    .post(validateUserCreation, handleValidationErrors, userController.createUser);

router.route("/:userid")
    .get(validateUserId, handleValidationErrors, userController.getUserById)
    .patch(validateUserUpdate, handleValidationErrors, userController.updateUser)
    .delete(validateUserId, handleValidationErrors, userController.deleteUser);



module.exports = router;