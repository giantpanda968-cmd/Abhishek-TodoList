const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");


// signupUser
async function signupUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "user Created Succesfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      succes: false,
    });
  }
}

// Login user
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(403).json({
        message: "Email or Password is Wrong",
        succes: false,
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      return res.status(403).json({
        message: "Email or Password is Wrong",
        succes: false,
      });
    }

    const token = jwtoken.sign({ Id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "User Login Succesfully",
      succes: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      succes: false,
    });
  }
}

module.exports = { signupUser, loginUser };
