import {
  TSignInWithCredentialsInputDefinition,
  TSignInWithCredentialsResponse,
  TSignInWithGoogleQueryDefinition,
} from "@spin-spot/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["signInWithCredentials"],
    mutationFn: signInWithCredentials,
    onMutate() {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

export function useSignInWithGoogle() {
  const queryClient = useQueryClient();
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
    onMutate() {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
