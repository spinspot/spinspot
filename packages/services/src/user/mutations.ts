import {
  IUser,
  TCreateUserInputDefinition,
  TUpdateUserInputDefinition,
  TUpdateUserParamsDefinition,
} from "@spin-spot/models";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export async function createUser(input: TCreateUserInputDefinition) {
  const res = await api.post("/users", { body: input });
  const user: IUser = await res.json();
  return user;
}

export function useCreateUser() {
  return useMutation({ mutationKey: ["createUser"], mutationFn: createUser });
}

export async function updateUser({
  _id,
  ...input
}: {
  _id: TUpdateUserParamsDefinition["_id"];
} & TUpdateUserInputDefinition) {
  const res = await api.put("/users/" + encodeURIComponent(`${_id}`), {
    body: input,
  });
  const user: IUser = await res.json();
  return user;
}

export function useUpdateUser() {
  return useMutation({ mutationKey: ["updateUser"], mutationFn: updateUser });
}
