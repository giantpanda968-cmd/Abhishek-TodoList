const express=require("express");
const usertask=require("../controllers/task.controller");
const router=express.Router();
const {taskValidation}=require("../middleware/task.middleware")

router.post("/task",taskValidation,usertask.userTask);
router.get("/task",usertask.getTask);
router.delete("/task/:id",usertask.deleteTask);
router.delete("/task",usertask.clearAllTask);

module.exports=router