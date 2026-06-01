const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/task.routes");
const authRoutes=require("./routes/auth.routes");
const cookieParser=require("cookie-parser");

const app = express();

app.use(express.json()); //MiddleWare
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.1.4:5173",
      "https://todo-list-nine-amber-67.vercel.app", // ← add karo
      
    ],
    credentials: true,
  }),
);

app.use("/api/task", taskRoutes);
app.use("/api/auth",authRoutes);
module.exports = app;
