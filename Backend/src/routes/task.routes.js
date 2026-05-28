const express = require("express");
const taskController = require("../controllers/task.controller");

const router = express.Router();

router.post("/task", taskController.usertask);

router.get("/task", taskController.gettask);

router.delete("/task", taskController.deleteAlltask);

router.delete("/task/:id", taskController.deleteOnetask);

module.exports = router;
