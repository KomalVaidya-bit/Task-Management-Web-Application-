const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use(express.json());


  //  ROUTES

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);


  //  TEST ROUTE

app.get("/", (req, res) => {
  res.send("API is running...");
});


  //  DATABASE + SERVER

mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanager")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB error:", err);
  });
