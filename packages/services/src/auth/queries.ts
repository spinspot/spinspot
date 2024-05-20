import { IUser } from "@spin-spot/models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getCurrentUser() {
  const res = await api.get("/auth/current-user");
  const user: IUser = await res.json();
  return user;
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });
}
