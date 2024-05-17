import {
  TGetUserParamsDefinition,
  TUpdateUserInputDefinition,
  TUpdateUserParamsDefinition,
  userSchema,
  type TCreateUserInputDefinition,
} from "@spin-spot/models";
import { hash } from "bcrypt";
import { model } from "mongoose";

userSchema.pre("save", async function (next) {
  if (this.password) this.password = await hash(this.password, 10);
  next();
});
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
