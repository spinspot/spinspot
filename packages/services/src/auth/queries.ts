import { ApiError, IUser } from "@spin-spot/models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getCurrentUser() {
  try {
    const res = await api.get("/auth/current-user");
    const user: IUser = await res.json();
    return user;
  } catch (err) {
    if (err instanceof ApiError) {
      return null;
    }
    throw err;
  }
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
}
