import { TSignInInputDefinition, TSignInResponse } from "@spin-spot/models";
import { api } from "../api";

export async function authorizeSignIn(input: TSignInInputDefinition) {
  const res = await api.post("/auth/sign-in", { body: input });

  if (!res.ok) {
    return null;
  }

  const { user, jwt }: TSignInResponse = await res.json();

  return { user, jwt };
}
