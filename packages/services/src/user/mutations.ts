import {
  IUser,
  TCreateUserInputDefinition,
  TUpdateUserInputDefinition,
  TUpdateUserParamsDefinition,
} from "@spin-spot/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { useAuth } from "../auth";

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
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUser,
    onSuccess(data) {
      if (data._id === user?._id) {
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      }
      queryClient.invalidateQueries({ queryKey: ["getUser", data._id] });
    },
  });
}
