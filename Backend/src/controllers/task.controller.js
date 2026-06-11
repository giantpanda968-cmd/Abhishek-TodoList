const taskModel = require("../models/task.model");

// post Method
async function userTask(req, res) {
  const { task } = req.body;

  await taskModel.create({
    task,
  });

  res.status(201).json({
    message: "task created succesfully",
  });
}

// GetMethod

async function getTask(req, res) {
  const task = await taskModel.find();

  if (!task || task.length === 0) {
    res.status(404).json({
      message: "No task found",
    });
    return;
  }

  res.status(200).json({
    message: "Task fectch successfully",
    task:task,
  });
}

// Delete method

async function deleteTask(req, res) {
  const { id } = req.params;

  await taskModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Task deleted successfully",
  });
}

//Clear all Task

async function clearAllTask(req,res) {


  await taskModel.deleteMany({});

  res.status(200).json({
    message:"All Task Deleted succesfully"
  })
}

module.exports = { userTask, getTask,deleteTask,clearAllTask};
