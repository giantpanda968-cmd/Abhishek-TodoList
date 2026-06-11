const taskModel = require("../models/task.model");

function taskValidation(req, res, next) {
  const { task } = req.body;

  if (!task || !task.trim()) {
    res.status(400).json({
      message: "Task is require",
    });
    return;
  }
  next();
}

module.exports = { taskValidation};
