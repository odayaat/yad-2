var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

router.get("/login", userController.getLogin);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.post("/register", userController.performRegister);

module.exports = router;
