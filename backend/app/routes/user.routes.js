const express = require("express");
const userController = require("../controllers/user.controller");
const userRoute = express.Router();


// Create a new Note
userRoute.post("/",userController.createNote);


userRoute.get("/get", userController.findAll);

module.exports = userRoute;