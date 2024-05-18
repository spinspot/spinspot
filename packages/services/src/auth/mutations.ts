import {
  TSignInInputDefinition,
  TSignInResponseDefinition,
} from "@spin-spot/models";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export async function signIn(input: TSignInInputDefinition) {
  const res = await api.post("/auth/sign-in", { body: input });
  const { user, jwt }: TSignInResponseDefinition = await res.json();

  if (localStorage) {
    localStorage.setItem("jwt", jwt);
  }

  return user;
}

export function useSignIn() {
  return useMutation({ mutationKey: ["signIn"], mutationFn: signIn });
}
