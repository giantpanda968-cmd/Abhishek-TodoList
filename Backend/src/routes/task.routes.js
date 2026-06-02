const express = require("express");
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/",authMiddleware, taskController.usertask);

router.get("/",authMiddleware, taskController.gettask);

router.delete("/",authMiddleware, taskController.deleteAlltask);

router.delete("/:id",authMiddleware, taskController.deleteOnetask);

module.exports = router;
