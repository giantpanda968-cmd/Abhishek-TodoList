const express=require("express");
const taskRoutes=require("./routes/task.routes");
const userRoutes=require("./routes/user.routes");
const cors=require('cors')

const app=express();

app.use(express.json());
app.use(cors());

app.use("/api/user",taskRoutes);
app.use("/api/user",userRoutes);

module.exports=app