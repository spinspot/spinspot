"use client";

import { EnvelopeIcon, KeyIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, GoogleIcon, TextInput } from "@spin-spot/components";
import {
  TSignInWithCredentialsInputDefinition,
  signInWithCredentialsInputDefinition,
} from "@spin-spot/models";
import {
  useAuth,
  useSignInWithCredentials,
  useSignInWithGoogle,
} from "@spin-spot/services";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();
  const user = useAuth();
  const signInWithCredentials = useSignInWithCredentials();
  const signInWithGoogle = useSignInWithGoogle();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInWithCredentialsInputDefinition>({
    resolver: zodResolver(signInWithCredentialsInputDefinition),
    shouldFocusError: false,
    mode: "onBlur",
  });

  const handleRegisterClick = () => {
    router.push("/register");
  };

  const handlePasswordClick = () => {
    router.push("/reset-password");
  };

  console.log(user.user);

  const handleSignIn: SubmitHandler<TSignInWithCredentialsInputDefinition> = (
    data,
  ) => {
    signInWithCredentials.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess() {
          router.push("/tables");
        },
      },
    );
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      <div className="mt-24 w-96 space-y-4 rounded-lg p-8 sm:mt-36">
        <div className="flex flex-col gap-1">
          <h2 className="text-primary mb-1 text-center text-3xl font-black">
            Iniciar Sesión
          </h2>
          <TextInput
            placeholder="example@email.com"
            type="email"
            topRightLabel="Correo Electrónico"
            className={`input-sm ${errors.email ? "input-error" : "input-primary"}`}
            iconLeft={
              <EnvelopeIcon className="text-primary h-6 w-6"></EnvelopeIcon>
            }
            bottomLeftLabel={errors.email?.message}
            {...register("email")}
          />
          <TextInput
            type="password"
            placeholder="12345678"
            className={`input-sm ${errors.password ? "input-error" : "input-primary"}`}
            topRightLabel="Contraseña"
            iconLeft={<KeyIcon className="text-primary h-6 w-6"></KeyIcon>}
            bottomLeftLabel={errors.password?.message}
            {...register("password")}
          />
        </div>
        <Button
          className="btn-sm btn-neutral w-full"
          label="Iniciar Sesión"
          labelSize="text-md"
          onClick={handleSubmit(handleSignIn)}
        />
        <Button
          className="btn-sm btn-neutral w-full"
          label="Continuar con Google"
          rightIcon={<GoogleIcon />}
          labelSize="text-md"
          onClick={() =>
            signInWithGoogle.mutate({
              app: "client",
              route: "/tables",
            })
          }
        />
        <Button
          className="btn-sm btn-link text-neutral w-full"
          label="Eres nuevo? Registrate"
          labelSize="text-md"
          onClick={handleRegisterClick}
        />
        <Button
          className="btn-sm btn-link text-primary w-full space-y-0"
          label="Olvidaste tu contraseña?"
          labelSize="text-md"
          onClick={handlePasswordClick}
        />
      </div>
    </div>
  );
}
