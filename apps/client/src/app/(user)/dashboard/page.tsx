"use client";

import { Button, Card, Loader } from "@spin-spot/components";
import { useTournaments } from "@spin-spot/services";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const tournaments = useTournaments();

  const handleClick = () => {
    router.push("/tables");
  };

  function handlePlay(tournamentId: string) {
    router.push(`/tournaments/${tournamentId}`);
  }

  const getCarouselClass = (cards: string | any[]) =>
    cards.length <= 4
      ? cards.length <= 1
        ? "justify-center"
        : "lg:justify-center"
      : "";

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
          className={`carousel carousel-center w-full gap-x-8 bg-inherit px-4 pb-8 ${tournaments.data && getCarouselClass(tournaments.data)}`}
        >
          {tournaments.isPending ? (
            <div className="flex w-full items-center justify-center">
              <Loader size="lg" className="text-primary" variant="dots" />
            </div>
          ) : tournaments.data?.length !== 0 ? (
            tournaments.data &&
            tournaments.data.map((tournament, index) => (
              <Card
                key={index}
                label={tournament.description}
                labelName={tournament.name}
                labelButton="Jugar"
                onClick={() => handlePlay(`${tournament._id}`)}
                className="carousel-item"
              />
            ))
          ) : (
            <div className="">
              No se tienen torneos para esta categoria actualmente
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
