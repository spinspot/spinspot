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
import { IPopulatedTournament } from "@spin-spot/models";
import {
  useAuth,
  useToast,
  useTournament,
  useUpdateTournament,
} from "@spin-spot/services";
import { useEffect, useState } from "react";

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
  const { user } = useAuth();
  const updateTournament = useUpdateTournament();

  const [isUpdating, setIsUpdating] = useState(false); // Estado para controlar si se está actualizando el torneo

  function handleInscription(tournament: IPopulatedTournament) {
    if (user?._id) {
      const playerIds = tournament.players.map((player) => player._id);
      const newPlayers = [...playerIds, user._id];
      setIsUpdating(true); // Comienza la actualización
      updateTournament.mutate(
        { _id: tournament._id, players: newPlayers },
        {
          onSuccess() {
            showToast({
              label: "Se ha inscrito al torneo de forma exitosa!",
              type: "success",
              duration: 3000,
            });
          },
          onError() {
            showToast({
              label: "Error al inscribirse en el torneo",
              type: "error",
              duration: 3000,
            });
          },
        },
      );
    }
  }

  const handleInscribirseToast = (tournament: IPopulatedTournament) => {
    showToast({
      label: "¿Seguro que quieres unirte al torneo?",
      type: "warning",
      acceptButtonLabel: "Sí",
      denyButtonLabel: "No",
      onAccept() {
        handleInscription(tournament);
      },
      onDeny() {
        showToast({
          label: "Inscripción Cancelada",
          type: "error",
          duration: 2500,
        });
      },
    });
  };

  function handleSalirse(tournament: IPopulatedTournament) {
    if (user?._id) {
      const playerIds = tournament.players.map((player) => player._id);
      const newPlayers = playerIds.filter((playerId) => playerId !== user._id);
      setIsUpdating(true); // Comienza la actualización
      updateTournament.mutate(
        { _id: tournament._id, players: newPlayers },
        {
          onSuccess() {
            showToast({
              label: "Se ha salido del torneo de forma exitosa!",
              type: "success",
              duration: 3000,
            });
          },
          onError() {
            showToast({
              label: "Error al salirse del torneo",
              type: "error",
              duration: 3000,
            });
          },
        },
      );
    }
  }

  const handleSalirseToast = (tournament: IPopulatedTournament) => {
    showToast({
      label: "¿Seguro que quieres salirte del torneo?",
      type: "warning",
      acceptButtonLabel: "Sí",
      denyButtonLabel: "No",
      onAccept() {
        handleSalirse(tournament);
      },
      onDeny() {
        showToast({
          label: "Inscripción Cancelada",
          type: "error",
          duration: 2500,
        });
      },
    });
  };

  useEffect(() => {
    if (!tournament.isFetching) {
      setIsUpdating(false);
    }
  }, [tournament.isFetching]);

  const buttonOnClick = tournament.data?.players.some(
    (player) => player._id === user?._id,
  )
    ? handleSalirseToast
    : handleInscribirseToast;

  const buttonText = tournament.data?.players.some(
    (player) => player._id === user?._id,
  )
    ? "Salirse"
    : "Inscribirse";

  const showLoader =
    isUpdating &&
    (tournament.data?.players.some((player) => player._id === user?._id) ? (
      <div className="flex items-center justify-center gap-2">
        <Loader size="md" className="text-secondary"></Loader> Saliéndose...
      </div>
    ) : (
      <div className="flex items-center justify-center gap-2">
        <Loader size="md" className="text-primary"></Loader> Inscribiendose...
      </div>
    ));

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
            <div className="text-3xl font-bold">
              {tournament.data?.eventType === "1V1"
                ? `Juagdores Inscritos ${tournament.data?.players?.length}/${tournament.data.maxPlayers}`
                : `Equipos Inscritos ${tournament.data?.teams.length}/${tournament.data?.maxTeams}`}
            </div>
            <Button
              label={showLoader || buttonText}
              className={`btn-lg w-72 ${showLoader ? "btn-disabled" : ""} ${buttonText === "Inscribirse" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => tournament.data && buttonOnClick(tournament.data)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
