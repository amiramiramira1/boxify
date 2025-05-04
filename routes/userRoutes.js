const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");


router.route("/")
    .get(userController.getAllUsers)
    .post(
        [
            body("name").notEmpty().withMessage("Name is required"),
            body("email").isEmail().withMessage("Valid email is required"),
            body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
        ],
        userController.createUser
    );



router.route("/:userid")
        .get( userController.getUserById)
        .patch( userController.updateUser)
        .delete(userController.deleteUser)
        



module.exports = router;