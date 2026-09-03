const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({ path: "./config.env" });
const app = express();

mongoose
  .connect(process.env.mongo_url)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const authRoute = require("./routes/auth.route");
const taskRoute = require("./routes/task.route");
const userRoute = require("./routes/user.route");
const errHandle = require("./middlewares/err.middleware");

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

// --- السطر المفقود الذي يسبب المشكلة ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoute);
app.use("/tasks", taskRoute);
app.use("/users", userRoute);
app.use(errHandle);

const port = process.env.port || 8000;
app.listen(port, "127.0.0.1", () => {
  console.log("server listen");
});