const express = require("express");
const { signup, signin, getUser, logout } = require("../controller/authController");
const jwtAuth = require("../middleware/jwtauth");

const authRouter = express.Router();

authRouter.post("/signup", signup); //ye signup route hai jo user ko register karta hai//post request par signup function call hota hai
authRouter.post("/signin",signin);
authRouter.get("/getuser",jwtAuth,  getUser)
authRouter.get("/logout",jwtAuth,  logout)

module.exports = authRouter;