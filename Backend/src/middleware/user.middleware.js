const userModel = require("../models/user.model");

// signUp user--
async function userValidation(req, res, next) {
  const { name, email, password } = req.body;

  if (name.length < 3) {
    return res.status(400).json({
      message: "name must be atleast 3 characters",
    });
  }
  const emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegix.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: "password atleast 6 characters",
    });
  }

  const isuserAlreadyExist = await userModel.findOne({
    email,
  });
  if (isuserAlreadyExist) {
    return res.status(400).json({
      message: "user allready exist",
    });
  }

  next();
}

module.exports = { userValidation };
