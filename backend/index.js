const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.mongourl)
  .then(() => console.log("DB connect"))
  .catch((err) => console.log(err));

const authRoute = require("./routes/auth.route");
const errHandle = require("./middlewares/err.middleware");

app.use(express.json());
app.use("/auth", authRoute);
app.use(errHandle);

const port = process.env.port;
app.listen(port, "127.0.0.1", () => {
  console.log("server listen");
});
