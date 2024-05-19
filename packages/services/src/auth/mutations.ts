import {
  TSignInWithCredentialsInputDefinition,
  TSignInWithCredentialsResponse,
  TSignInWithGoogleQueryDefinition,
} from "@spin-spot/models";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "../api";

export async function signInWithCredentials(
  input: TSignInWithCredentialsInputDefinition,
) {
  const res = await api.post("/auth/sign-in/credentials", { body: input });

  if (!res.ok) {
    return null;
  }

  const { user }: TSignInWithCredentialsResponse = await res.json();

  return { user };
}

export function useSignInWithCredentials() {
  return useMutation({
    mutationKey: ["signInWithCredentials"],
    mutationFn: signInWithCredentials,
  });
}

export function useSignInWithGoogle() {
  const router = useRouter();

  return useMutation({
    mutationKey: ["signInWithGoogle"],
    mutationFn: async (query: TSignInWithGoogleQueryDefinition) => {
      const url = new URL(
        "/auth/sign-in/google",
        process.env.NEXT_PUBLIC_API_URL,
      );

      const searchParams = new URLSearchParams(query);

      router.push(url.href + `?${searchParams}`);

      return true;
    },
  });
}
