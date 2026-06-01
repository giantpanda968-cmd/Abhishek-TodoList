require("dotenv").config();

const userModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { Name, Email, Password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      Email,
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({
        message: "User already exist",
      });
    }
    const user = await userModel.create({ Name, Email, Password });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token, {
      sameSite: "lax",
    });

    res.status(201).json({
      message: "User Created Succesfully",
    });
  } catch (error) {
    if (error.Name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages[0] });
    }
    res.status(500).json({ message: "your password is too short" });
  }
}
 // login Page
 
  async function loginUser(req,res){
    try{
      const {Email,Password}=req.body;

      const user=await userModel.findOne({Email});

      if(!user){
         return res.status(404).json({ message: "User not found" });
      }
       if (user.Password !== Password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token",token,{
       sameSite: "lax",
    });
     res.status(200).json({ message: "Login Successful" });
    }
    catch(error){
      res.status(500).json({ message: error.message });
    }
  }

module.exports = { registerUser,loginUser};
