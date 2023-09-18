import express from "express";
import userService from "../service/userService";

const userController = express.Router();

userController.route("/user").post(userService.createUser);

userController.route("/user").get(userService.findAllUser);

export default userController;
