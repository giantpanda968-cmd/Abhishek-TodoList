const mongoose=require("mongoose");

const taskSchema=mongoose.Schema({
    task:String
})

const taskModel=mongoose.model("task",taskSchema);

module.exports=taskModel;