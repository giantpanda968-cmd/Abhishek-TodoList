const express = require("express");
const router = express.Router();
const userSignup = require("../controllers/user.controller");
const userLogin = require("../controllers/user.controller");
const { userValidation } = require("../middleware/user.middleware");

router.post("/signup", userValidation, userSignup.signupUser);
router.post("/login", userLogin.loginUser);

module.exports = router;
