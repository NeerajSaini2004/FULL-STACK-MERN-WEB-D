const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const databaseConnect = require("./config/db_config");
const { userRoute } = require("./routers/authRouters");
require("dotenv").config();

const app = express();
databaseConnect();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// static files serve
app.use(express.static(path.join(__dirname, "../Client")));

app.use("/", userRoute);
app.use("/home", (req, res) => {
  res.status(200).json({
    data: "Instagram user management like application",
  });
});

module.exports = app;
