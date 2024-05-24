import {
  TSignInWithCredentialsInputDefinition,
  TSignInWithCredentialsResponse,
  TSignInWithGoogleQueryDefinition,
  TSignUpWithCredentialsInputDefinition,
} from "@spin-spot/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "../api";

export async function signUpWithCredentials(
  input: TSignUpWithCredentialsInputDefinition,
) {
  const res = await api.post("/auth/sign-up/credentials", { body: input });

  if (!res.ok) {
    return null;
  }

  const { user }: TSignInWithCredentialsResponse = await res.json();

  return { user };
}

export function useSignUpWithCredentials() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["signUpWithCredentials"],
    mutationFn: signUpWithCredentials,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

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
    onSuccess() {
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
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

export async function signOut() {
  const res = await api.post("/auth/sign-out");

  return res.ok;
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["signOut"],
    mutationFn: signOut,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
