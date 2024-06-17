"use client";

import { Card } from "@spin-spot/components";
import { useTournaments } from "@spin-spot/services";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Tournament() {
  const router = useRouter();

  const tournaments = useTournaments();

  function handlePlay(tournamentId: string) {
    router.push(`/tournaments/${tournamentId}`);
  }

  // Estados para los diferentes niveles de torneos
  const [beginnerCards, setBeginnerCards] = useState([
    {
      label: "Inicio: 11 de junio",
      labelName: "Torneo principiantes",
      labelButton: "Jugar",
    },
    {
      label: "Inicio: 11 de junio",
      labelName: "Torneo principiantes",
      labelButton: "Jugar",
    },
    {
      label: "Inicio: 11 de junio",
      labelName: "Torneo principiantes",
      labelButton: "Jugar",
    },
    {
      label: "Inicio: 11 de junio",
      labelName: "Torneo principiantes",
      labelButton: "Jugar",
    },
    {
      label: "Inicio: 11 de junio",
      labelName: "Torneo principiantes",
      labelButton: "Jugar",
    },
  ]);

  const [intermediateCards, setIntermediateCards] = useState([
    {
      label: "Inicio: 17 de julio",
      labelName: "Torneo intermedios",
      labelButton: "Jugar",
    },
    {
      label: "Inicio 3 de junio",
      labelName: "Torneo intermedios",
      labelButton: "Jugar",
    },
  ]);

  const [advancedCards, setAdvancedCards] = useState([
    {
      label: "Inicio: 3 de junio",
      labelName: "Torneo avanzados",
      labelButton: "Jugar",
    },
    {
      label: "Inicio: 10 de junio",
      labelName: "Torneo avanzados",
      labelButton: "Jugar",
    },
    {
      label: "Inicio: 15 de junio",
      labelName: "Torneo avanzados",
      labelButton: "Jugar",
    },
    {
      label: "Inicio: 15 de junio",
      labelName: "Torneo avanzados",
      labelButton: "Jugar",
    },
    {
      label: "Inicio: 15 de junio",
      labelName: "Torneo avanzados",
      labelButton: "Jugar",
    },
  ]);

  // Función para determinar la clase de justificación
  const getCarouselClass = (cards: string | any[]) =>
    cards.length <= 4
      ? cards.length === 1
        ? "justify-center"
        : "lg:justify-center"
      : "";

  return (
    <div className="flex-grow">
      <div className="grid h-64 w-full items-center justify-items-center bg-[url(/pingPongBackGround.svg)] bg-cover bg-center bg-no-repeat md:h-72">
        <div className="font-title text-center">
          <h1 className="flex flex-col text-3xl">
            <span className="text-white">TORNEOS</span>
            <span className="text-white">UNIMET</span>
          </h1>
        </div>
      </div>
      <div className="mt-10">
        {/* Carrusel para principiantes */}
        <div className="p-4">
          <h3 className="mb-4 text-center text-xl">Torneos Principiantes</h3>
          <div
            className={`carousel carousel-center w-full gap-x-8 bg-inherit px-4 pb-8 ${getCarouselClass(beginnerCards)}`}
          >
            {tournaments.data &&
              tournaments.data.map((tournament, index) => (
                <Card
                  key={index}
                  label={tournament.description}
                  labelName={tournament.name}
                  labelButton="Jugar"
                  onClick={() => handlePlay(`${tournament._id}`)}
                  className="carousel-item"
                />
              ))}
          </div>
        </div>

        {/* Carrusel para intermedios */}
        <div className="p-4">
          <h3 className="mb-4 text-center text-xl">Torneos Intermedios</h3>
          <div
            className={`carousel carousel-center w-full gap-x-8 bg-inherit px-4 pb-8 ${getCarouselClass(intermediateCards)}`}
          >
            {tournaments.data &&
              tournaments.data.map((tournament, index) => (
                <Card
                  key={index}
                  label={tournament.description}
                  labelName={tournament.name}
                  labelButton="Jugar"
                  className="carousel-item"
                />
              ))}
          </div>
        </div>

        {/* Carrusel para avanzados */}
        <div className="p-4">
          <h3 className="mb-4 text-center text-xl">Torneos Avanzados</h3>
          <div
            className={`carousel carousel-center w-full gap-x-8 bg-inherit px-4 pb-8 ${getCarouselClass(advancedCards)}`}
          >
            {tournaments.data &&
              tournaments.data.map((tournament, index) => (
                <Card
                  key={index}
                  label={tournament.description}
                  labelName={tournament.name}
                  labelButton="Jugar"
                  className="carousel-item"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
