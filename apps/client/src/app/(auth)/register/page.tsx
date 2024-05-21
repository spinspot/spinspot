"use client";

import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { Button, TextInput } from "@spin-spot/components";
import { useAuth, useCreateUser, useUsers } from "@spin-spot/services";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const auth = useAuth();
  const users = useUsers();
  const createUser = useCreateUser();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterClick = () => {
    router.push("/login");
  };

  const handleSubmit = () => {
    createUser.mutate(
      {
        email: email,
        firstName: firstName,
        lastName: "Doe",
        gender: "MALE",
        password: password,
        userType: "PLAYER",
        isActive: true,
      },
      {
        onSuccess() {
          console.log("Registro exitoso!");
        },
      },
    );
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      <div className="mt-24 w-96 space-y-4 rounded-lg p-8 sm:mt-36">
        <div className="flex flex-col gap-1">
          <h2 className="text-neutral mb-1 text-center text-3xl font-black">
            Registrarse
          </h2>
          <TextInput
            placeholder="example@email.com"
            type="email"
            topRightLabel="Correo Electrónico"
            className="input-sm"
            iconLeft={
              <EnvelopeIcon className="text-primary h-6 w-6"></EnvelopeIcon>
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            placeholder="John Doe"
            type="text"
            topRightLabel="Nombre"
            className="input-sm"
            iconLeft={<UserIcon className="text-primary h-6 w-6"></UserIcon>}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            placeholder="12345678"
            type="password"
            topRightLabel="Contraseña"
            className="input-sm"
            iconLeft={<KeyIcon className="text-primary h-6 w-6"></KeyIcon>}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          className="btn-sm btn-neutral w-full"
          label="Registrarse"
          labelSize="text-md"
          onClick={handleSubmit}
        />
        <Button
          className="btn-sm btn-link text-neutral w-full"
          label="Ya tienes cuenta? Inicia Sesión"
          labelSize="text-md"
          onClick={handleRegisterClick}
        />
      </div>
    </div>
  );
}
