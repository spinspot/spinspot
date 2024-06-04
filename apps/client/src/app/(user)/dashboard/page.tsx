"use client";

import { Button, Card } from "@spin-spot/components";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/tables");
  };
  return (
    <div className="flex-grow">
      <div className="bg- grid h-56 w-full items-center justify-items-center bg-[url(/pingPongBackground.svg)] bg-cover bg-center bg-no-repeat md:h-60">
        <div className="font-title text-center">
          <h1 className="flex flex-col text-3xl">
            <span className="text-white">PING PONG</span>
            <span className="text-white">UNIMET</span>
          </h1>
        </div>
      </div>
      <div className="font-title h-56  w-full pt-5 text-center font-normal md:h-60">
        <h2 className="pb-3 text-xl">¡Bienvenido a Spin-Spot! </h2>
        <p className="px-6 pb-5 text-center">
          En esta página podrás realizar las reservas de las nuevas canchas de
          Ping Pong disponibles para los estudiantes.
        </p>
        <Button
          className="btn-lg btn-primary"
          label="¿Estas listo para empezar a jugar?"
          labelSize="text-md"
          onClick={handleClick}
        />
      </div>
      <div className="font-title w-full pt-10 text-center font-normal md:h-20">
        <h2 className="h-10 text-2xl">Torneos activos</h2>
      </div>

      <div className="carousel carousel-center w-full space-x-8  bg-inherit p-4 md:justify-center">
        <Card
          label="Inicio: 11 de junio"
          labelName="Torneo profesores"
          labelButton="Jugar"
          className="carousel-item"
        />
        <Card
          label="Inicio: 17 de julio"
          labelName="Torneo Ingenieria"
          labelButton="Jugar"
          className="carousel-item"
        />
        <Card
          label="Inicio 3 de junio"
          labelName="Torneo FACES"
          labelButton="Jugar"
          className="carousel-item"
        />
      </div>
    </div>
  );
}
