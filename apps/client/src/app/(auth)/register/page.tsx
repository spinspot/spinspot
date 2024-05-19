"use client";

import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { Button, TextInput } from "@spin-spot/components";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/login");
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
          />
          <TextInput
            placeholder="Jhon Doe"
            type="text"
            topRightLabel="Nombre"
            className="input-sm"
            iconLeft={<UserIcon className="text-primary h-6 w-6"></UserIcon>}
          />
          <TextInput
            placeholder="12345678"
            type="password"
            topRightLabel="Contraseña"
            className="input-sm"
            iconLeft={<KeyIcon className="text-primary h-6 w-6"></KeyIcon>}
          />
        </div>
        <Button
          className="btn-sm btn-neutral w-full"
          label="Registrarse"
          labelSize="text-md"
        />
        <Button
          className="btn-sm btn-link w-full"
          label="Ya tienes cuenta? Inicia Sesión"
          labelSize="text-md"
          onClick={handleRegisterClick}
        />
      </div>
    </div>
  );
}
