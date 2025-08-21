require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const cors = require("cors");
const databaseConnect = require("./config/databaseconfig");

const app = express();
databaseConnect();

app.use(cookieParser());// Middleware to parse cookies
app.use(express.json());

app.use(// Middleware to handle CORS
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use("/api/auth", authRouter);// Registering the authRouter for handling authentication routes
// This allows the app to handle requests to /api/auth/signup, /api/auth/signin
app.use("/", (req, res) => {
  res.status(200).json({
    data: "JW Authentication application",
  });
});

module.exports = app; // Exporting the app to be used in index.js for starting the server
// This allows the app to be imported in index.js where the server is started