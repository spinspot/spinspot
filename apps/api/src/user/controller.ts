import {
  createUserInputDefinition,
  getUserParamsDefinition,
  updateUserInputDefinition,
  updateUserParamsDefinition,
} from "@spin-spot/models";
import { Request, Response } from "express";
import { userService } from "./service";

async function getUsers(req: Request, res: Response) {
  const users = await userService.getUsers();
  return res.status(200).json(users);
}

async function getUser(req: Request, res: Response) {
  const params = getUserParamsDefinition.parse(req.params);
  const user = await userService.getUser(params._id);
  return res.status(200).json(user);
}

async function createUser(req: Request, res: Response) {
  const input = createUserInputDefinition.parse(req.body);
  const user = await userService.createUser(input);
  return res.status(200).json(user);
}

async function updateUser(req: Request, res: Response) {
  const params = updateUserParamsDefinition.parse(req.params);
  const input = updateUserInputDefinition.parse(req.body);
  const user = await userService.updateUser(params._id, input);
  return res.status(200).json(user);
}

export const userController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
} as const;