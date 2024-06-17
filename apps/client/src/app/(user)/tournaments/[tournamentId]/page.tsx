"use client";

import {
  BanknotesIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Countdown,
  Loader,
  PingPongIcon,
} from "@spin-spot/components";
import { useToast, useTournament } from "@spin-spot/services";

interface TournamentParams {
  tournamentId: string;
}

export default function TournamentJoin({
  params,
}: {
  params: TournamentParams;
}) {
  const { showToast } = useToast();
  const tournament = useTournament(params.tournamentId);
  console.log(tournament);

  const handleInscribirse = () => {
    showToast({
      label: "¿Seguro que quieres unirte al torneo?",
      type: "warning",
      acceptButtonLabel: "Sí",
      denyButtonLabel: "No",
      //   onAccept() {
      //     funcionAca()
      //   },
      onDeny() {
        showToast({
          label: "Inscripción Cancelada",
          type: "error",
          duration: 2500,
        });
      },
    });
  };

  return (
    <div>
      {tournament.isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader size="lg" className="text-primary" variant="dots"></Loader>
        </div>
      ) : (
        <div>
          <div className="relative grid h-64 w-full items-center justify-items-center bg-[url(/tournamentBackGround.svg)] bg-cover bg-center bg-no-repeat md:h-72">
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <div className="font-title relative text-center">
              <h1 className="flex flex-col text-3xl">
                <span className="text-white">TORNEO</span>
                <span className="text-white">
                  {tournament.data?.name.toUpperCase()}
                </span>
              </h1>
            </div>
          </div>
          <div className="font-title py-10 text-center">
            <h1 className="text-3xl font-bold">Información Relevante 🏆</h1>
          </div>
          {tournament.data && (
            <div className="flex w-full justify-center">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:gap-x-8">
                <Badge
                  labelName="Fecha Inicio"
                  label={new Date(tournament.data?.startTime)
                    .toLocaleDateString([], {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\//g, "-")}
                  leftIcon={
                    <CalendarDaysIcon className="text-neutral h-[36px] w-[36px]" />
                  }
                />
                <Badge
                  labelName="Fecha Fin"
                  label={new Date(tournament.data?.endTime)
                    .toLocaleDateString([], {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\//g, "-")}
                  leftIcon={
                    <CalendarDaysIcon className="text-neutral h-[36px] w-[36px]" />
                  }
                />
                <Badge
                  labelName="Modalidad"
                  label={tournament.data.eventType}
                  leftIcon={<PingPongIcon className="h-[36px] w-[36px]" />}
                />
                <Badge
                  labelName="Sede"
                  label={"Unimet"}
                  leftIcon={
                    <BuildingLibraryIcon className="text-neutral h-[36px] w-[36px]" />
                  }
                />
                <Badge
                  labelName="Formato"
                  label={"Eliminación"}
                  leftIcon={
                    <TrophyIcon className="text-neutral h-[36px] w-[36px]" />
                  }
                />
                <Badge
                  labelName="Precio"
                  label={tournament.data.prize}
                  leftIcon={
                    <BanknotesIcon className="text-neutral h-[36px] w-[36px]" />
                  }
                />
              </div>
            </div>
          )}
          <div className="my-10 flex flex-col items-center justify-center gap-8">
            <div className="text-3xl font-bold">Tiempo Restante</div>
            {tournament.data?.startTime && (
              <Countdown startTime={tournament.data?.startTime}></Countdown>
            )}
            <div className="text-3xl font-bold">{`Juagdores Inscritos ${tournament.data?.players?.length}/${tournament.data?.maxPlayers}`}</div>
            <Button
              label="Inscribirse"
              className="btn-primary btn-lg w-72"
              onClick={handleInscribirse}
            ></Button>
          </div>
        </div>
      )}
    </div>
  );
}
