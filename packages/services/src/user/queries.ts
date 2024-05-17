import { IUser, TGetUserParamsDefinition } from "@spin-spot/models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getUsers() {
  const res = await api.get("/users");
  const users: IUser[] = await res.json();
  return users;
}

export function useUsers() {
  return useQuery({ queryKey: ["getUsers"], queryFn: getUsers });
}

export async function getUser(_id: TGetUserParamsDefinition["_id"]) {
  const res = await api.get("/users/" + encodeURIComponent(`${_id}`));
  const user: IUser = await res.json();
  return user;
}

export function useUser(_id: TGetUserParamsDefinition["_id"]) {
  return useQuery({ queryKey: ["getUser", _id], queryFn: () => getUser(_id) });
}
