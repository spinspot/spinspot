"use client";

import { Button, Card } from "@spin-spot/components";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [cards, setCards] = useState([
    {
      label: "Inicio: 11 de junio",
      labelName: "Torneo profesores",
      labelButton: "Jugar",
    },
    {
      label: "Inicio: 17 de julio",
      labelName: "Torneo Ingenieria",
      labelButton: "Jugar",
    },
    {
      label: "Inicio 3 de junio",
      labelName: "Torneo FACES",
      labelButton: "Jugar",
    },
  ]);

  const handleClick = () => {
    router.push("/tables");
  };

  return (
    <div className="flex-grow">
      <div className="grid h-64 w-full items-center justify-items-center bg-[url(/pingPongBackGround.svg)] bg-cover bg-center bg-no-repeat md:h-72">
        <div className="font-title text-center">
          <h1 className="flex flex-col text-3xl">
            <span className="text-white">PING PONG</span>
            <span className="text-white">UNIMET</span>
          </h1>
        </div>
      </div>
      <div className="font-title w-full pt-10 text-center font-normal">
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
      <div className="font-title w-full pt-6 text-center font-normal">
        <h2 className="h-10 text-2xl">Torneos activos</h2>
      </div>
      <div className="p-4">
        <div
          className={`carousel w-full gap-x-8 bg-inherit px-4 pb-10 ${
            cards.length <= 4
              ? cards.length === 1
                ? "justify-center"
                : "lg:justify-center"
              : ""
          }`}
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              label={card.label}
              labelName={card.labelName}
              labelButton={card.labelButton}
              className="carousel-item"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
