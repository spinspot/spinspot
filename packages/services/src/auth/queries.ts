import { ApiError, IUser } from "@spin-spot/models";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export async function getCurrentUser() {
  try {
    if (typeof window !== "undefined") {
      const token = new URLSearchParams(window.location.search).get("token");
      if (token) {
        window.localStorage.setItem("JWT_TOKEN", token);
      } else if (window.localStorage.getItem("JWT_TOKEN") === null) {
        return null;
      }
    }

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
