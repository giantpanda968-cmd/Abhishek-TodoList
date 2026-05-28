const express = require("express");
const taskModel = require("./models/task.model");
const cors = require("cors");
const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(express.json()); //MiddleWare

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://todo-list-nine-amber-67.vercel.app", // ← add karo
    ],
  }),
);

app.use("/api/task", taskRoutes);

module.exports = app;
