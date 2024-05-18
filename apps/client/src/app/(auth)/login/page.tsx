"use client";

import { Button, TextInputIcon } from "@spin-spot/components";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      <div className="mt-24 w-96 space-y-4 rounded-lg p-8 sm:mt-36">
        <div className="flex flex-col gap-1">
          <h2 className="text-neutral mb-1 text-center text-3xl font-black">
            Iniciar Sesión
          </h2>
          <TextInputIcon
            placeholder="example@email.com"
            type="email"
            topRightLabel="Correo Electrónico"
            svg="email"
          ></TextInputIcon>
          <TextInputIcon
            placeholder="12345678"
            type="password"
            topRightLabel="Contraseña"
            svg="password"
          ></TextInputIcon>
        </div>
        <Button
          className="btn-sm btn-neutral w-full"
          label="Iniciar Sesión"
          labelSize="text-md"
        ></Button>
        <Button
          className="btn-sm btn-neutral w-full"
          label="Continuar con Google"
          rightIcon="./GoogleIcon.svg"
          labelSize="text-md"
        ></Button>
        <Button
          className="btn-sm btn-link w-full"
          label="Eres nuevo? Registrate"
          labelSize="text-md"
          onClick={handleRegisterClick}
        ></Button>
      </div>
    </div>
  );
}
