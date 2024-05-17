import {
  TGetUserParamsDefinition,
  TUpdateUserInputDefinition,
  TUpdateUserParamsDefinition,
  userSchema,
  type TCreateUserInputDefinition,
} from "@spin-spot/models";
import { model } from "mongoose";

const User = model("User", userSchema);

async function getUsers() {
  const users = await User.find();
  return users;
}

async function getUser(_id: TGetUserParamsDefinition["_id"]) {
  const user = await User.findById(_id);
  return user;
}

async function createUser(input: TCreateUserInputDefinition) {
  const user = await User.create(input);
  return user;
}

async function updateUser(
  _id: TUpdateUserParamsDefinition["_id"],
  input: TUpdateUserInputDefinition,
) {
  const user = await User.findByIdAndUpdate(_id, input);
  return user;
}

export const userService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
} as const;
