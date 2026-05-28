const taskModel = require("../models/task.model");

// UserPost-Method----
async function usertask(req, res) {
  const { title } = req.body;

  await taskModel.create({ title });

  res.status(201).json({
    message: "Task Created",
  });
}

// GetTask-Method.....
async function gettask(req, res) {
  const task = await taskModel.find();

  res.status(200).json({
    message: "Data Fetch",
    task: task,
  });
}

//ClearAlltask -Method......
async function deleteAlltask(req, res) {
  await taskModel.deleteMany({});

  res.status(200).json({
    message: "Delete All Task",
  });
}
// DelteOneTask-Method.....
async function deleteOnetask(req, res) {
  const id = req.params.id;
  await taskModel.findOneAndDelete({
    _id: id,
  });
  res.status(200).json({
    message: "Delete one task",
  });
}

module.exports = { usertask, gettask, deleteAlltask, deleteOnetask };
