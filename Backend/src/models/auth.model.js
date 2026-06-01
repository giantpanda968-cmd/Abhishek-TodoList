const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  Email: {
    type: String,
    unique: true,
    require:true,
    trim:true,
    lowercase:true
  },
  Password: {
    type:String,
    require:true,
    minlength:6
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
