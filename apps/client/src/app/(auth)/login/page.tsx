"use client";

import { useAuthContext } from "@/lib/auth-context";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/16/solid";
import { Button, GoogleIcon, TextInput } from "@spin-spot/components";
import {
  useCreateUser,
  useSignInWithCredentials,
  useSignInWithGoogle,
  useUsers,
} from "@spin-spot/services";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const auth = useAuthContext();
  const users = useUsers();
  const createUser = useCreateUser();
  const signInWithCredentials = useSignInWithCredentials();
  const signInWithGoogle = useSignInWithGoogle();

  const [formCredentials, setFormCredentials] = useState({
    email: "",
    password: "",
  });

  console.log(formCredentials);
  console.log(auth.user);
  console.log(auth.isLoading);

  const handleRegisterClick = () => {
    router.push("/register");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormCredentials({
      ...formCredentials,
      [name]: value,
    });
  };

  const handleSignIn = () => {
    signInWithCredentials.mutate(
      {
        email: formCredentials.email,
        password: formCredentials.password,
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
          <h2 className="text-neutral mb-1 text-center text-3xl font-black">
            Iniciar Sesión
          </h2>
          <TextInput
            placeholder="example@email.com"
            type="email"
            name="email"
            value={formCredentials.email}
            onChange={handleChange}
            topRightLabel="Correo Electrónico"
            className="input-sm"
            iconLeft={
              <EnvelopeIcon className="text-primary h-6 w-6"></EnvelopeIcon>
            }
          />
          <TextInput
            placeholder="12345678"
            type="password"
            name="password"
            value={formCredentials.password}
            onChange={handleChange}
            className="input-sm"
            topRightLabel="Contraseña"
            iconLeft={<KeyIcon className="text-primary h-6 w-6"></KeyIcon>}
          />
        </div>
        <Button
          className="btn-sm btn-neutral w-full"
          label="Iniciar Sesión"
          labelSize="text-md"
          onClick={handleSignIn}
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
      </div>
    </div>
  );
}
