import { Request, Response } from "express";
import { ParamsDictionary, RequestHandler } from "express-serve-static-core";
import userRepository from "../repository/userRepository";

const userService = {
  findAllUser: async (req: Request, res: Response) => {
    const allUsers = await userRepository.findAllUser();

    console.log(allUsers);

    res.json(allUsers);
  },

  createUser: async (req: Request, res: Response) => {
    const { name, nickname, email, password } = req.body;

    const newUser = await userRepository.createUser({
      name,
      nickname,
      email,
      password,
    });

    return res.json(newUser);
  },
};

export default userService;
